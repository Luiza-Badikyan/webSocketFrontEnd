import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private url = 'http://localhost:8888';
    private socket;

    constructor(private http: HttpClient) {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        // this.socket.emit('new-message', message);
        return this.http.post(`${this.url}/user/1/messages/3`, {message});
    }

    public subscribeToMessages = () => {
        console.log(1);
        return new Observable((observer: any) => {
            console.log(2);
            this.socket.on('new-message', (message) => {
                console.log('socket', message);
                observer.next(message);
                console.log('getMessages work!!!');
            });
        });
    }

    // public sendMessage(message): Observable<any> {
    //     return
    // }

}
