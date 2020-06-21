import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

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

  private tokenExpirationTamer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqIkKB8yyBtbn9c2n0pAqPD_ZJCQM30Wk", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
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

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(["/auth"]);

    if (this.tokenExpirationTamer) {
      clearTimeout(this.tokenExpirationTamer)
    }
    this.tokenExpirationTamer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTamer = setTimeout(() => this.logout(), expirationDuration)
  }


  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000); // 1 h
    localStorage.setItem("userData", JSON.stringify(user))
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
