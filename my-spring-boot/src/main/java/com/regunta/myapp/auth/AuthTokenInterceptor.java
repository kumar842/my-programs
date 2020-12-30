package com.regunta.myapp.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import com.kastkode.springsandwich.filter.api.BeforeHandler;
import com.kastkode.springsandwich.filter.api.Flow;
import com.regunta.myapp.cognito.AwsCognitoJwtValidatorUtil;

@Component
public class AuthTokenInterceptor implements BeforeHandler {
	
	//@Autowired
	private AwsCognitoJwtValidatorUtil awsCognitoJwtValidatorUtil;
	
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
		this.awsCognitoJwtValidatorUtil.validateAWSJwtToken(request.getHeader(HttpHeaders.AUTHORIZATION));
		return Flow.CONTINUE;
	}
}
