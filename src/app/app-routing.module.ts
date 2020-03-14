import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'group-chat',
        loadChildren: () => import(`./group-chat/group-chat.module`).then(m => m.GroupChatModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
