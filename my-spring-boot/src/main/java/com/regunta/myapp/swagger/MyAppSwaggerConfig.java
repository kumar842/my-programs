package com.regunta.myapp.swagger;

import static springfox.documentation.builders.PathSelectors.regex;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * The Class MyAppSwaggerConfig.
 */
@Configuration
@EnableSwagger2
public class MyAppSwaggerConfig {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SPRING_WEB).select().apis(RequestHandlerSelectors.any()).paths(regex("/api/.*"))
				.build();
	}
}
