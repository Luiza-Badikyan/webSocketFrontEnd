import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from "../../services/auth.service";
import 'quill-mention';
import 'quill-emoji';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from "../../services/api.service";
import { ImageModalComponent } from "../../shared/modals/image-modal/image-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
    public faPaperPlane = faPaperPlane;
    public faSmile = faSmile;
    public faFile = faFile;
    public faFileUpload = faFileUpload;
    public faFileDownload = faFileDownload;
    public fileToUpload: Array<File> = [];
    public image = [];


    constructor(private chatService: ChatService,
                private authService: AuthService,
                private apiService: ApiService,
                private modal: NgbModal) {
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

    public sendMessage() {
        if (this.newMessage.value || this.fileToUpload.length) {
            console.log('fileToUpload', this.fileToUpload);
            let data = new FormData();
            data.append('message', this.newMessage.value);
            console.log('this.fileToUpload.length', this.fileToUpload.length);
            console.log('this.fileToUpload', this.fileToUpload);

            if (this.fileToUpload.length) {
                const files: Array<File> = this.fileToUpload;
                [...files].forEach((file, i) => {
                    data.append("uploads[]", files[i], files[i]['name']);
                })
            }
            this.chatService.sendMessage(data, this.User$.id)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(res => {
                    console.log(res);
                    this.newMessage.reset();
                    console.log('------', this.messages);
                    this.hideEmoji = false;
                    this.fileToUpload = [];
                })
        } else {
            this.hideEmoji = false;
            return
        }

    }

    public addEmoji(e) {
        console.log(e);
        console.log(e.emoji.native);
        this.newMessage.setValue(this.newMessage.value + e.emoji.native);
    }

    // test () {
    //     const url = window.URL.createObjectURL(res);
    //     const a = document.createElement('a');
    //     document.body.appendChild(a);
    //     a.setAttribute('style', 'display: none');
    //     a.href = url;
    //     a.download = file.fileName;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     a.remove();
    // }

    public handleFileInput(e) {
        // e.preventDefault();
        // e.stopPropagation();
        console.log('e.target.files', e.target.files);


        this.hideEmoji = false;
        // let reader = new FileReader();
        //
        // reader.onload =this._handleReaderLoaded.bind(this);
        //
        // reader.readAsBinaryString(e.target.files[0]);


        if (!this.fileToUpload.length) {
            this.fileToUpload = Array.from(e.target.files)
            // this.fileToUpload = <Array<File>>e.target.files;
        } else {
            this.fileToUpload = Array.from([...this.fileToUpload, ...e.target.files]);
        }
        this.image = [];

        [...this.fileToUpload].forEach((file, i) => {
            let reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);

        });


    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        // this.image = btoa(binaryString);
        // console.log(btoa(binaryString));
        this.image.push(`data:image/png;base64,${btoa(binaryString)}`)

    }

    removeFile(index) {
        console.log(index);
        this.fileToUpload.splice(index, 1);
        console.log('8888888888888', this.fileToUpload);
    }

    openImage(file) {
        const modalRef = this.modal.open(ImageModalComponent, {windowClass: 'chatImages'});
        // const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.file = file;
    }

}
