import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/web-socket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface ChatMessage {
  content: string;
  sender: string;
  type: 'CHAT' | 'JOIN' | 'LEAVE';
}

@Component({
  selector: 'app-chat',
  standalone: true,  
  imports: [
    CommonModule,  
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  userName: string = '';
  messageContent: string = '';
  messages: ChatMessage[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
  }

  joinChat(): void {
    if (this.userName.trim()) {
      this.webSocketService.connect(this.userName);
    }
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      const message: ChatMessage = {
        sender: this.userName,
        content: this.messageContent,
        type: 'CHAT'
      };
      this.webSocketService.sendMessage(message);
      this.messageContent = ''; 
    }
  }

  @HostListener('window:beforeunload')
  beforeUnloadHandler(): void {
    this.webSocketService.disconnect(this.userName);
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect(this.userName);  
  }

  isJoinMessage(message: ChatMessage): boolean {
    return message.type === 'JOIN';
  }

  isLeaveMessage(message: ChatMessage): boolean {
    return message.type === 'LEAVE';
  }

  isChatMessage(message: ChatMessage): boolean {
    return message.type === 'CHAT';
  }
}
