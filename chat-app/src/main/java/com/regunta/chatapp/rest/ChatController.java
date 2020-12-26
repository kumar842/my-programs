package com.regunta.chatapp.rest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * Rest controller of chat
 * 
 * @author rregunta
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/api")
public class ChatController {
	
	private static final Logger LOGGER = LogManager.getLogger(ChatController.class);
	
    @GetMapping(path= "/health")
    public ResponseEntity<String> getHealth(){
    	return new ResponseEntity<>("UP", HttpStatus.OK);
    }
}
