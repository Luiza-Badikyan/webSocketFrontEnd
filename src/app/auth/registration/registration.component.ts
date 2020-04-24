import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<any> = new Subject<any>();
    public registrationForm: FormGroup = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        date_of_birth: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    model: NgbDateStruct;

    constructor(private apiService: ApiService,
                private router: Router) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    changeDateFormat(e) {
        console.log('ghfhf', e);
        this.registrationForm.get('date_of_birth').setValue(`${e.year}-${e.month}-${e.day}`);
    }

    register() {
        this.apiService.request('post', '/user/register', this.registrationForm.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                console.log(data);
                if (data) {
                    localStorage.setItem('token', data.token);
                    this.router.navigate(['/group-chat']);
                }
            });
        console.log(this.registrationForm.value);
        this.registrationForm.reset();
    }

}
