package com.regunta.myapp;

import javax.annotation.PostConstruct;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

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
	
	private static ConfigurableApplicationContext context;
	private static ClassLoader mainThreadClassLoader;
	
	public static void main(String[] args) {
	    mainThreadClassLoader = Thread.currentThread().getContextClassLoader();
		context = SpringApplication.run(MySpringBootApp.class, args);
		log.info("Application started...");
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		/** create repositories & controllers in Dynamic **/
		return application.sources(MySpringBootApp.class);
	}
	
	/** restarts the application, without shutting down **/
	public static void restart() {
        ApplicationArguments args = context.getBean(ApplicationArguments.class);

        Thread thread = new Thread(() -> {
            context.close();
            context = SpringApplication.run(MySpringBootApp.class, args.getSourceArgs());
        });
        
        thread.setContextClassLoader(mainThreadClassLoader);
        thread.setDaemon(false);
        thread.start();
    }
	
	@PostConstruct
	public void postCostructSample() throws Exception {
//		log.info("post construct....");
//		log.info("empRepository.findByFirstNameIgnoreCaseContaining(\"kum\") : ",
//				empRepository.findByFirstNameIgnoreCaseContaining("kum"));
//		log.info(
//				"this.empRepository.findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrMiddleNameIgnoreCaseContaining(\"rsdf\", \"asdf\", \"bc\") : ",
//				this.empRepository
//						.findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrMiddleNameIgnoreCaseContaining(
//								"rsdf", "asdf", "bc"));

	}
}
