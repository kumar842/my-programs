/*******************************************************************************
 * Copyright (C) Proterra - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Source code can not be copied and/or distributed without the express
 * permission of Proterra
 * 
 * @author Nilesh Darade (NDarade@protera.com)
 ******************************************************************************/
package com.regunta.myapp.log;

import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import lombok.extern.slf4j.Slf4j;


/**
 * The Class LoggingService.
 */
@Component

/** The Constant log. */
@Slf4j
public class LoggerService {

	/**
	 * Log request.
	 *
	 * @param httpServletRequest the http servlet request
	 * @param body the body
	 */
	public void logRequest(HttpServletRequest httpServletRequest) {
		StringBuilder stringBuilder = new StringBuilder();
		Map<String, String> parameters = buildParametersMap(httpServletRequest);

		stringBuilder.append("REQUEST ");
		stringBuilder.append("method=[").append(httpServletRequest.getMethod()).append("] ");
		stringBuilder.append("path=[").append(httpServletRequest.getRequestURI()).append("] ");
		stringBuilder.append("headers=[").append(buildHeadersMap(httpServletRequest)).append("] ");

		if (!parameters.isEmpty()) {
			stringBuilder.append("parameters=[").append(parameters).append("] ");
		}
		
		String body = requestBody(httpServletRequest);
		if (body != null) {
			stringBuilder.append("body=[" + body + "]");
		}

		log.info(stringBuilder.toString());
	}

	/**
	 * Log response.
	 *
	 * @param httpServletRequest the http servlet request
	 * @param httpServletResponse the http servlet response
	 * @param body the body
	 */
	public void logResponse(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
		StringBuilder stringBuilder = new StringBuilder();

		stringBuilder.append("RESPONSE ");
		stringBuilder.append("method=[").append(httpServletRequest.getMethod()).append("] ");
		stringBuilder.append("path=[").append(httpServletRequest.getRequestURI()).append("] ");
		stringBuilder.append("responseHeaders=[").append(buildHeadersMap(httpServletResponse)).append("] ");
		stringBuilder.append("responseBody=[").append(responseBody(httpServletResponse)).append("] ");

		log.info(stringBuilder.toString());
	}

	/**
	 * Builds the parameters map.
	 *
	 * @param httpServletRequest the http servlet request
	 * @return the map
	 */
	private Map<String, String> buildParametersMap(HttpServletRequest httpServletRequest) {
		Map<String, String> resultMap = new HashMap<>();
		Enumeration<String> parameterNames = httpServletRequest.getParameterNames();

		while (parameterNames.hasMoreElements()) {
			String key = parameterNames.nextElement();
			String value = httpServletRequest.getParameter(key);
			resultMap.put(key, value);
		}

		return resultMap;
	}

	/**
	 * Builds the headers map.
	 *
	 * @param request the request
	 * @return the map
	 */
	private Map<String, String> buildHeadersMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();

		Enumeration<?> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			map.put(key, value);
		}

		return map;
	}

	/**
	 * Builds the headers map.
	 *
	 * @param response the response
	 * @return the map
	 */
	private Map<String, String> buildHeadersMap(HttpServletResponse response) {
		Map<String, String> map = new HashMap<>();

		Collection<String> headerNames = response.getHeaderNames();
		for (String header : headerNames) {
			map.put(header, response.getHeader(header));
		}

		return map;
	}
	
	/**
	 * Gets the body.
	 *
	 * @param reader the reader
	 * @return the body
	 */
	public String requestBody(HttpServletRequest request) {
		try {
			return request.getReader().lines().collect(Collectors.joining(""));
		} catch (Exception e) {
			log.error("Failed to parse body of the reuqest  :: {}", ExceptionUtils.getStackTrace(e));
			return "";
		}
	}

	public String responseBody(HttpServletResponse response) {
		try {
			return new String(((ContentCachingResponseWrapper) response).getContentAsByteArray());
//			ByteArrayOutputStream byte1 = new ByteArrayOutputStream();
//			//bao.wri
//			response.getOutputStream().write(byte1.toByteArray());
//			response.getOutputStream().flush();
//			//response.getOutputStream().flush();
//			log.info("byte1" + byte1);
//			log.info("byte1" + new String(byte1.toByteArray(), "UTF-8"));
//			return byte1.toString();
			//return response.getOutputStream()    .write(new byte[]);//    LoggerService. . .getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			//return null;
		} catch (Exception e) {
			log.error("Failed to parse body of the reuqest  :: {}", ExceptionUtils.getStackTrace(e));
			return "";
		}
	}
}
