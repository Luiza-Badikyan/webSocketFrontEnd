import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import 'quill-mention';
import 'quill-emoji';

@Component({
    selector: 'app-group-chat',
    templateUrl: './group-chat.component.html',
    styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<any> = new Subject<any>();
    public User$;
    public newMessage = new FormControl('', [Validators.required]);
    public messages: string[] = [];
    public hideEmoji: boolean = false;


    constructor(private chatService: ChatService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.User$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(user => {
                this.User$ = user;
                console.log('user', this.User$);
            });
        this.chatService.getMessages()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: any) => {
                console.log('before', data);
                this.messages = data;
                console.log('after', this.messages);
            });
        this.chatService
            .subscribeToMessages()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((message: any) => {
                console.log('mmm', message);
                this.messages.push(message);
                console.log(this.messages);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    sendMessage() {
        this.chatService.sendMessage(this.newMessage.value, this.User$.id).subscribe();
        this.newMessage.reset();
        console.log('------', this.messages);
this.hideEmoji = false;
    }

    addEmoji(e) {
        console.log(e);
        console.log(e.emoji.native);
        this.newMessage.setValue(this.newMessage.value + e.emoji.native);
    }
    
}
