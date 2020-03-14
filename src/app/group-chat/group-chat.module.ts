import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupChatRoutingModule } from './group-chat-routing.module';
import { GroupChatComponent } from './group-chat/group-chat.component';
import {ChatService} from "../services/chat.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [GroupChatComponent],
  imports: [
    CommonModule,
    GroupChatRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService]
})
export class GroupChatModule { }
