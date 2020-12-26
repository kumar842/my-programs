package com.regunta.chatapp;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 
 * Entry point to the Chat application
 * 
 * @author rregunta
 *
 */
@SpringBootApplication
public class ChatApp {
	private static final Logger LOGGER = LogManager.getLogger(ChatApp.class);
	
    public static void main(String[] args) {
    	LOGGER.trace("Chat application started");
    	
        SpringApplication.run(ChatApp.class, args);
    }

}
