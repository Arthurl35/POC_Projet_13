import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable, Subject } from 'rxjs';

interface ChatMessage {
  content: string;
  sender: string;
  type: 'CHAT' | 'JOIN' | 'LEAVE';
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client | null = null;
  private subject: Subject<ChatMessage> = new Subject<ChatMessage>();

  connect(userName: string): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      {},
      (frame?: Stomp.Frame) => {
        console.log('Connected: ' + frame?.headers);

        this.stompClient?.subscribe('/topic/public', (messageOutput: Stomp.Message) => {
          this.subject.next(JSON.parse(messageOutput.body) as ChatMessage);
        });

        // Envoyer un message indiquant que l'utilisateur a rejoint
        const joinMessage: ChatMessage = { sender: userName, content: '', type: 'JOIN' };
        if (this.stompClient) {
          this.stompClient.send('/app/chat.join', {}, JSON.stringify(joinMessage));
        }
      }
    );
  }

  sendMessage(message: ChatMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    }
  }

  getMessages(): Observable<ChatMessage> {
    return this.subject.asObservable();
  }

  disconnect(userName: string): void {
    if (this.stompClient !== null) {
      // Envoyer un message de type LEAVE avant de se déconnecter
      const leaveMessage: ChatMessage = { sender: userName, content: '', type: 'LEAVE' };
      this.stompClient.send('/app/chat.leave', {}, JSON.stringify(leaveMessage));

      // Ensuite, déconnecter WebSocket
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
