package com.regunta.myapp.log;

import java.io.ByteArrayOutputStream;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import lombok.extern.slf4j.Slf4j;


/**
 * The Class LoggingService.
 */
@Component
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

		stringBuilder.append(String.format("REQUEST method=[%s] path[%s] ", httpServletRequest.getMethod(),
				httpServletRequest.getRequestURI()));
		//Commented the below as it's printing sensitive information like the x-api-key etc.
		//stringBuilder.append(String.format("headers=[%s] ", buildHeadersMap(httpServletRequest)));

		if (!parameters.isEmpty()) {
			stringBuilder.append(String.format("parameters=[%s] ", parameters));
		}
		
		String body = requestBody(httpServletRequest);
		if (body != null) {
			stringBuilder.append(String.format("requestBody=[%s]", body));
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

		stringBuilder.append(String.format("RESPONSE method=[%s] path[%s] ", httpServletRequest.getMethod(),
				httpServletRequest.getRequestURI()));
		stringBuilder.append(String.format("responseHeaders=[%s] ", buildHeadersMap(httpServletResponse)));
		stringBuilder.append(String.format("responseBody=[%s]", responseBody(httpServletResponse)));//TODO: handle the error case

		log.info(stringBuilder.toString());
	}

	/**
	 * Builds the parameters map.
	 *
	 * @param httpServletRequest the http servlet request
	 * @return the map
	 */
	private Map<String, String> buildParametersMap(HttpServletRequest httpServletRequest) {
		return Collections.list(httpServletRequest.getParameterNames())
				.stream().collect(Collectors.toMap(key -> key, key -> httpServletRequest.getParameter(key)));
	}

	/**
	 * Builds the headers map.
	 *
	 * @param request the request
	 * @return the map
	 */
	private Map<String, String> buildHeadersMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();

		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			map.put(key, value);
		}

		return map;
		
		//class org.apache.tomcat.util.http.NamesEnumerator cannot be cast to class java.util.Collection 
		//(org.apache.tomcat.util.http.NamesEnumerator is in unnamed module of loader 'app'; java.util.Collection 
		//is in module java.base of loader 'bootstrap')
//		return ((Collection<String>)request.getHeaderNames()).stream().collect(Collectors.toSet()).stream()
//				.collect(Collectors.toMap(header -> header, header -> request.getHeader(header)));
	}

	/**
	 * Builds the headers map.
	 *
	 * @param response the response
	 * @return the map
	 */
	private Map<String, String> buildHeadersMap(HttpServletResponse response) {
		return response.getHeaderNames().stream().collect(Collectors.toSet()).stream()
				.collect(Collectors.toMap(header -> header, header -> response.getHeader(header)));
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
			if(response.getStatus() == HttpStatus.OK.value()) {
				return new String(((ContentCachingResponseWrapper) response).getContentAsByteArray());
			} else {
				ByteArrayOutputStream byte1 = new ByteArrayOutputStream();
				//bao.wri
				//response.getOutputStream().write(byte1.toByteArray());
				//System.out.println(response.getWriter().);
				
//				response.getOutputStream().flush();
//				log.info("byte1" + byte1);
//				log.info("byte1" + new String(byte1.toByteArray(), "UTF-8"));
//				return byte1.toString();
				return ""; //TODO: how to return error response body
			}

		} catch (Exception e) {
			log.error("error........");
			return "";
		}
	}
}
