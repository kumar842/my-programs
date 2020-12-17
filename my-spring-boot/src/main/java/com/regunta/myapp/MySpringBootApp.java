package com.regunta.myapp;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

import com.regunta.myapp.repository.EmployeeRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author rregunta
 * https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
 *
 */
@SpringBootApplication
@Slf4j
@ComponentScan(basePackages = { "com.kastkode.springsandwich.filter", "com.regunta.*" })
public class MySpringBootApp extends SpringBootServletInitializer {
	
	@Autowired
	private EmployeeRepository empRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(MySpringBootApp.class, args);
		log.info("Application started...");
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MySpringBootApp.class);
	}
	
	@PostConstruct
	public void postCostructSample() throws Exception {
		log.info("post construct....");
		log.info("empRepository.findByFirstNameIgnoreCaseContaining(\"kum\") : ",
				empRepository.findByFirstNameIgnoreCaseContaining("kum"));
		log.info(
				"this.empRepository.findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrMiddleNameIgnoreCaseContaining(\"rsdf\", \"asdf\", \"bc\") : ",
				this.empRepository
						.findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrMiddleNameIgnoreCaseContaining(
								"rsdf", "asdf", "bc"));

	}
}
