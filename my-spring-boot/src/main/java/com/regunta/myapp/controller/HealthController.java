package com.regunta.myapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
