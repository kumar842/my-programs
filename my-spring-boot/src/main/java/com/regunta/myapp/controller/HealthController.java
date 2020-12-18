package com.regunta.myapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class HealthController.
 */
@RestController
@CrossOrigin
public class HealthController {

	/**
	 * Health.
	 *
	 * @return the response entity
	 */
	@GetMapping("/health")
	public ResponseEntity<String> health() {
		ResponseEntity.ok().build();
		return new ResponseEntity<String>("OK", HttpStatus.OK);
	}
}
