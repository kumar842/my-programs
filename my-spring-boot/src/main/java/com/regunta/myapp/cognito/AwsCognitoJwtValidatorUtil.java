package com.regunta.myapp.cognito;

import java.io.IOException;
import java.net.URL;
import java.text.ParseException;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.regions.Regions;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.regunta.myapp.AppConfig;

import lombok.extern.slf4j.Slf4j;

/**
 * Util class for validating the authorization tokens
 * 
 */
//@Component
@Slf4j
public class AwsCognitoJwtValidatorUtil {
	
	@Autowired
	private AppConfig appConfig;
	
	private ConfigurableJWTProcessor<SecurityContext> jwtProcessor;
	
	@PostConstruct
	public void createJwtProcessor() throws IOException, ParseException {
		log.info("createJwtProcessor() started");
		
		try {
			String jwkSetPath = "https://cognito-idp." + Regions.valueOf(this.appConfig.getAwsRegion()).getName()
					+ ".amazonaws.com/" + this.appConfig.getAwsUserPoolId() + "/.well-known/jwks.json";

			log.info("this.conf.getJwksetpath() : " + jwkSetPath);
			
			this.jwtProcessor = new DefaultJWTProcessor<>();
			this.jwtProcessor.setJWSKeySelector(new JWSVerificationKeySelector<>(JWSAlgorithm.RS256,
					new ImmutableJWKSet<>(JWKSet.load(new URL(jwkSetPath)))));

		} catch (ParseException e) {
			log.error("createJwtProcessor(): exception occurred while creating jwt processor :: {}", ExceptionUtils.getStackTrace(e));
			throw e;
			
		} catch (IOException e) {
			log.error("createJwtProcessor(): exception occurred while creating jwt processor :: {}", ExceptionUtils.getStackTrace(e));
			throw e;
		}
		log.info("createJwtProcessor() completed");
	}
	
	
	/**
	 * This validates the Aws Jwt Token using Nimbus Jose Jwt Library.
	 * 
	 * @param token
	 * @return JWTClaimsSet
	 * @throws JOSEException 
	 * @throws BadJOSEException 
	 * @throws ParseException 
	 */
	public JWTClaimsSet validateAWSJwtToken(String token)  
			throws BadJOSEException, JOSEException, ParseException {
		return this.jwtProcessor.process(token, null);
	}
}