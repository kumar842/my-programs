package com.regunta.chatapp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.regunta.chatapp.dao.UserDAO;
import com.regunta.chatapp.util.MessageUtil;
import com.regunta.chatapp.util.UserUtil;
import com.rregunta.chatapp.models.ChatMessage;

/**
 * Socket handler for all charger connections 
 * 
 * @author rregunta
 *
 */
@Component
public class SocketHandler extends TextWebSocketHandler {
	private static final Logger LOGGER = LogManager.getLogger(SocketHandler.class);
	
	private UserDAO userDAO;
	private MessageUtil messageUtil;
	private UserUtil userUtil;
	
	private Map<String, List<WebSocketSession>> activeUserSessionsMap;
	
	public SocketHandler(UserDAO userDAO, UserUtil userUtil, MessageUtil messageUtil) {
		super();
		this.userDAO = userDAO;
		this.userUtil = userUtil;
		this.messageUtil = messageUtil;
		
		this.activeUserSessionsMap = userDAO.getUserNamesLsit().stream()
				.collect(Collectors.toMap(x -> x, x -> new ArrayList<WebSocketSession>()));
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
		String fromUser = userUtil.getUserName(session);
		ChatMessage chatMessage = messageUtil.toChatMessage(message);
		if(chatMessage.isValidChatMessage()) {
			List<WebSocketSession> sessions = activeUserSessionsMap.get(chatMessage.getUser());
			if(!CollectionUtils.isEmpty(sessions)) {
				sessions.forEach(s -> {
					try {
						s.sendMessage(messageUtil.toTextMessage(new ChatMessage(fromUser, chatMessage.getMessage(), chatMessage.getTimestamp())));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				});
			}
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		activeUserSessionsMap.get(userUtil.getUserName(session)).add(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		activeUserSessionsMap.get(userUtil.getUserName(session)).remove(session);
	}
}