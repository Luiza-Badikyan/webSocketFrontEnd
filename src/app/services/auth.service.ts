import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public User$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }

  checkToken() {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    if( !this.checkToken() ) {
      return false
    }
    const token = localStorage.getItem('token');
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);

      const {email, id, roles, first_name, last_name} = decodedToken;
      const user = {email, id, roles, first_name, last_name};
      console.log('decodedToken', user);
      this.User$.next(user);
      return user;
  }

}
