import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from "./guards/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'group-chat',
        canLoad: [AuthGuard],
        loadChildren: () => import(`./group-chat/group-chat.module`).then(m => m.GroupChatModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
