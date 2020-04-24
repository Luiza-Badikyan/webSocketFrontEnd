import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupChatModule } from './group-chat/group-chat.module';
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpMainInterceptor } from "./services/http.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { FontAwesomeModule } from "ngx-icons";

export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GroupChatModule,
        HttpClientModule,
        FontAwesomeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["localhost:3000"],
            }
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpMainInterceptor, multi: true}
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
