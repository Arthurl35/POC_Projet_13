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
  type: 'CHAT';
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
export class ChatComponent implements OnInit {
  userName: string = '';
  messageContent: string = '';
  messages: ChatMessage[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message: ChatMessage) => {
      this.messages.push(message);
    });
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

  isChatMessage(message: ChatMessage): boolean {
    return message.type === 'CHAT';
  }
}
