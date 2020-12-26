package com.regunta.chatapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import com.regunta.chatapp.dao.UserDAO;
import com.regunta.chatapp.util.MessageUtil;
import com.regunta.chatapp.util.UserUtil;

/**
 * 
 * Web socket configuration for all charger connections 
 * 
 * @author rregunta
 *
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private MessageUtil messageUtil;
	
	@Autowired
	private UserUtil userUtil;
	
	@Autowired
	private ValidateUserInterceptor validateUserInterceptor;
	
	/**
	 * registers web socket handlers for charger connections
	 * 
	 */
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		DefaultHandshakeHandler handshakeHandler = new DefaultHandshakeHandler();
		//handshakeHandler.setSupportedProtocols("ocpp1.6");
		
		registry.addHandler(new SocketHandler(userDAO, userUtil, messageUtil), "*")
									.setAllowedOrigins("*")
									.addInterceptors(validateUserInterceptor)
									.setHandshakeHandler(handshakeHandler);
	}

}