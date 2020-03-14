import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit, OnDestroy {
    private $unsubscribe: Subject<any> = new Subject<any>();
    public newMessage = new FormControl('', [Validators.required]);
    public messages: string[] = [];

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.chatService
            .subscribeToMessages()
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe((message: any) => {
                console.log('mmm', message);
                this.messages.push(message.message);
                console.log(this.messages);
            });
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }

    sendMessage() {
        this.chatService.sendMessage(this.newMessage.value).subscribe();
        this.newMessage.reset();
        console.log('------', this.messages);

    }

}
