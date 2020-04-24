import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/internal/Subject";
import { ApiService } from "../../services/api.service";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  public loginForm: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
  });

  constructor(private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

    login() {
    this.apiService.request('post', '/user/login', this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(data => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/group-chat']);
        });
        this.loginForm.reset();
    }

}
