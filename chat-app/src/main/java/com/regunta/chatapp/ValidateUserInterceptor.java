package com.regunta.chatapp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.regunta.chatapp.dao.UserDAO;

import lombok.extern.slf4j.Slf4j;

/**
 * Interceptor to check if a charger connection is duplicate
 * 
 * @author rregunta
 *
 */
@Slf4j
@Component
public class ValidateUserInterceptor implements HandshakeInterceptor {
	
	@Autowired
	private UserDAO userDao;
	
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		String userName = request.getURI().getPath().substring(1);
		
		/** duplicate connection, drop it immediately **/
		if(!userDao.getUserNamesLsit().contains(userName)) {
			
			log.info("beforeHandshake(): Invalid user : {}", userName);
			return false;
		}
		return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		//Nothing to do here
	}
	
}
