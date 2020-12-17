package com.regunta.myapp.schedule;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PeriodicService {
	
	@Scheduled(cron = "${triggerExpression}")//TODO: debug this
	public void sampleScheduleMethod() {
		log.info("sampleScheduleMethod() job started at : {}", LocalDateTime.now());
	}
}
