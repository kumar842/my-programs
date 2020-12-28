package com.rregunta.chatapp.models;

import java.util.Date;

import org.springframework.util.StringUtils;

import lombok.Data;

@Data
public class ChatMessage {
	private String user;
	private String message;
	private Date timestamp;
	
	public ChatMessage(String user, String message, Date timestamp) {
		super();
		this.user = user;
		this.message = message;
		this.timestamp = timestamp;
	}
	
	
	public boolean isValidChatMessage() {
		return !StringUtils.isEmpty(user) && 
				!StringUtils.isEmpty(message) && 
				timestamp != null;
	}
}
