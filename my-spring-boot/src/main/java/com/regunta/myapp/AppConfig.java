package com.regunta.myapp;

import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Component
@Data
@ConfigurationProperties
@Slf4j
public class AppConfig {
	
	public void cacheValue() {
		log.info("cacheValue(): reading ... from the database");
		try {
			//read from db
			
		}catch (Exception e) {
			log.error("cacheValue(): exception occurred while reading ... from database :: {}", ExceptionUtils.getStackTrace(e));
			log.info("cacheValue(): adding default value to .. from properties file");
			this.xxx = this.getXxxDefaultValue();
		}
	}
	
	@PostConstruct
    public void cache() {
		Timer t = new Timer();
		t.schedule(new TimerTask() {
		    @Override
		    public void run() {
		    	cacheValue();
		    }
		}, 0, Integer.parseInt(this.getCacheRefreshIntervalInMin()) * 60 * 1000); //converting minutes to milli-seconds
    }
	
	@Value("${api.auth.key}")
	private String apiKey;
	
	@Value("${entity.isSoftDelete}")
	private Boolean entityIsSoftDelete;
	
	@Value("${entity.isFetchOnlyValid}")
	private Boolean entityIsFetchOnlyValid;
	
	private String xxx;
	
	@Value("${xxx.default.value}")
	private String xxxDefaultValue;
	
	@Value("${cache.refresh.interval.in.min}")
	private String cacheRefreshIntervalInMin;
}