import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: "root"})

export class AuthService {
  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqIkKB8yyBtbn9c2n0pAqPD_ZJCQM30Wk", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqIkKB8yyBtbn9c2n0pAqPD_ZJCQM30Wk", {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
  }


  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, localId, idToken, expirationDate);
    this.user.next(user);
  }


  private handleError(errResp: HttpErrorResponse) {
    let errorMessage = "Something went wrong";
    if (!errResp.error || !errResp.error.error) {
      return throwError(errorMessage)
    }
    switch (errResp.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "This operation is not allowed!";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later."
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted."
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password."
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator."
        break;
    }
    return throwError(errorMessage)
  }
}
