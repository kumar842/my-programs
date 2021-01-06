package com.regunta.myapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.regunta.myapp.MySpringBootApp;

/**
 * The Class HealthController.
 */
@RestController
@CrossOrigin
public class HealthController {
	
	@GetMapping("/health")
	String health() {
		return "OK";
	}
	
	@GetMapping("/restart")
	String restart() {
		MySpringBootApp.restart();
		return "submitted restart request!!";
	}
}
