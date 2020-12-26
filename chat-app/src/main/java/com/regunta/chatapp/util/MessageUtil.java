package com.regunta.chatapp.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;

import com.google.gson.Gson;
import com.proterra.chatapp.models.ChatMessage;

import lombok.Data;

@Component
@Data
public class MessageUtil {
	private Gson gson = new Gson();
	
	public ChatMessage toChatMessage(TextMessage textMessage) {
		System.out.println("textMessage : " + textMessage);
		return gson.fromJson(textMessage.getPayload(), ChatMessage.class);
	}
	
	public TextMessage toTextMessage(ChatMessage chatMessage) {
		return new TextMessage(gson.toJson(chatMessage));
	}
}
