package com.poc.back.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.poc.back.model.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage message) {
        return message;  
    }

    @MessageMapping("/chat.join")
    @SendTo("/topic/public")
    public ChatMessage join(ChatMessage message) {
        message.setType(ChatMessage.MessageType.JOIN);
        return message; 
    }

    @MessageMapping("/chat.leave")
    @SendTo("/topic/public")
    public ChatMessage leave(ChatMessage message) {
        message.setType(ChatMessage.MessageType.LEAVE);
        return message;  
    }
}