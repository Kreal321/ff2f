import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Swal from "sweetalert2";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StompService {

    private hostUrl;
    private socket;
    private socketClient;

    constructor() {
        this.hostUrl = environment.api + "/stomp";
        this.socket = new SockJS(this.hostUrl);
        this.socketClient = Stomp.over(this.socket);
        this.socketClient.connect({}, () => {
        },(error) => {
            Swal.fire({
                title: 'Unable to update the game',
                text: 'Please manually refresh the page',
                icon: 'warning',
            })
            console.log(error);
        });
        // Debug
        // this.socketClient.debug = (message: string) => {
        //
        // }
     }

     subscribe(path: string, callback: any): void {

        // this.socket = new SockJS(this.hostUrl);
        //
        // this.socketClient = Stomp.over(this.socket);

        if (this.socketClient.connected) {
            this.subscribePath(path, callback);
            return;
        }

        setTimeout(() => {
            if (this.socketClient.connected) {
                this.subscribePath(path, callback);
                return;
            }
            Swal.fire({
                title: 'Unable to connect the socket',
                text: 'Please manually refresh the page',
                icon: 'warning',
            })
            // throw new Error("Socket is not connected");
        }, 1000);


        // this.socketClient.connect({}, () => {
        //     this.subscribePath(path, callback);
        // },(error) => {
        //     Swal.fire({
        //         title: 'Unable to update the game',
        //         text: 'Please manually refresh the page',
        //         icon: 'warning',
        //     })
        //     console.log(error);
        // });


    }

    private subscribePath(path: string, callback: any): void {
        this.socketClient.subscribe('/topics/' + path, (message) => {
            callback(message);
        });
    }

    disconnect(): void {
        if (this.socketClient.connected) {
            this.socketClient.disconnect(
                () => console.log("Disconnected")
            );
        }
    }



}
