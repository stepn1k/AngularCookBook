import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.value) return;

    let email = form.value.email;
    let password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(
      data => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errMessage => {
        this.isLoading = false;
        this.error = errMessage;
        setTimeout(() => this.error = null, 4000)
      });

    form.reset()
  }

  ngOnInit(): void {
  }

}
