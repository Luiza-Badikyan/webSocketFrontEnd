import { Injectable } from '@angular/core';
import {
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private router: Router, private authService: AuthService) {
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkAuth();
    }

    checkAuth() {
        const isAuth = this.authService.checkToken();
        if (isAuth) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
