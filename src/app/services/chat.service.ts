import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private url = environment.URL;
    private socket;

    constructor(private http: HttpClient) {
        this.socket = io(this.url);
    }

    public sendMessage(message, userId) {
        const t = localStorage.getItem('token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        // this.socket.emit('new-message', message);
        return this.http.post(`${this.url}/chat/${userId}/messages/3`, {message});
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
    };

    public getMessages() {
        return this.http.get(`${this.url}/chat/messages/3`);
    }

}
