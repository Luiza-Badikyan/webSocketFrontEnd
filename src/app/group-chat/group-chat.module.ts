import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GroupChatRoutingModule } from './group-chat-routing.module';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatService } from "../services/chat.service";
import { NgModule } from "@angular/core";
import { QuillModule } from 'ngx-quill'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../shared/shared.module";
import { ImageModalComponent } from "../shared/modals/image-modal/image-modal.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [GroupChatComponent],
    imports: [
        CommonModule,
        GroupChatRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PickerModule,
        FontAwesomeModule,
        QuillModule.forRoot(),
        SharedModule,
        NgbModalModule
    ],
    providers: [ChatService],
    entryComponents: [ImageModalComponent],
})
export class GroupChatModule {
}
