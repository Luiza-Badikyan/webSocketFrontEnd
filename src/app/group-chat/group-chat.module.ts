import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GroupChatRoutingModule } from './group-chat-routing.module';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatService } from "../services/chat.service";
import { NgModule } from "@angular/core";
import { QuillModule } from 'ngx-quill'
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
    declarations: [GroupChatComponent],
    imports: [
        CommonModule,
        GroupChatRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PickerModule,
        QuillModule.forRoot()
    ],
    providers: [ChatService]
})
export class GroupChatModule {
}
