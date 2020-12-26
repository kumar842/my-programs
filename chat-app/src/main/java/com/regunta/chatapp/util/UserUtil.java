package com.regunta.chatapp.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Component
@Data
public class UserUtil {
	public String getUserName(WebSocketSession session) {
		String uri = session.getUri().toString();
		String userName = uri.substring(uri.lastIndexOf("/") + 1);
		
		return userName;
	}
}
