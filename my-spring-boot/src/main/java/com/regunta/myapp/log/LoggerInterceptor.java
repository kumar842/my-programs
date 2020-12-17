package com.regunta.myapp.log;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.ContentCachingResponseWrapper;

@Component
public class LoggerInterceptor extends HandlerInterceptorAdapter {
	
	@Autowired
	private LoggerService loggerService;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		loggerService.logResponse(request, response);
		((ContentCachingResponseWrapper) response).copyBodyToResponse();
	}
}
