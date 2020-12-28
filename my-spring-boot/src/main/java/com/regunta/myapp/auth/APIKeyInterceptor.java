package com.regunta.myapp.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import com.kastkode.springsandwich.filter.api.BeforeHandler;
import com.kastkode.springsandwich.filter.api.Flow;
import com.regunta.myapp.AppConfig;
import com.regunta.myapp.error.UnAuthorizedException;

@Component
public class APIKeyInterceptor implements BeforeHandler {
	
	@Autowired
	private AppConfig config;
	
	/**
	 * Handle.
	 *
	 * @param request  the request
	 * @param response the response
	 * @param handler  the handler
	 * @param flags    the flags
	 * @return the flow
	 * @throws Exception the exception
	 */
	@Override
	public Flow handle(HttpServletRequest request, HttpServletResponse response, HandlerMethod handler, String[] flags)
			throws Exception {
		if (!config.getApiKey().equals(request.getHeader("x-api-key"))) {
			throw new UnAuthorizedException();
		}
		return Flow.CONTINUE;
	}
}
