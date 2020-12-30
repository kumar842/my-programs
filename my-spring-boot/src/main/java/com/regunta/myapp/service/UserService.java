package com.regunta.myapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserResult;
import com.amazonaws.services.cognitoidp.model.AdminDeleteUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminGetUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminGetUserResult;
import com.amazonaws.services.cognitoidp.model.AdminInitiateAuthRequest;
import com.amazonaws.services.cognitoidp.model.AdminInitiateAuthResult;
import com.amazonaws.services.cognitoidp.model.AdminUpdateUserAttributesRequest;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.AuthFlowType;
import com.amazonaws.services.cognitoidp.model.DeliveryMediumType;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.cognitoidp.model.UserType;
import com.regunta.myapp.AppConfig;
import com.regunta.myapp.entity.CognitoUser;

/**
 * Service implementation for User
 * 
 */
//@Service
public class UserService {

	@Autowired
	private AppConfig appConfig;
	
	private AWSCognitoIdentityProvider awsCognitoIdentityProvider;
	
	/**
	 * returns aws cognito identity provider.
	 * 
	 * @return
	 */
	@PostConstruct
	public void getAmazonCognitoIdentityClient() {
		System.setProperty("aws.accessKeyId", this.appConfig.getAccessKeyId());
		System.setProperty("aws.secretKey", this.appConfig.getSecretKey());
		AWSCredentialsProvider credentialsProvider = new DefaultAWSCredentialsProviderChain();
		awsCognitoIdentityProvider = AWSCognitoIdentityProviderClientBuilder.standard().withCredentials(credentialsProvider)
				.withRegion(Regions.valueOf(this.appConfig.getAwsRegion()))
				.build();
	}
	
	/**
	 * user login
	 */
	public CognitoUser login(CognitoUser user) {
		if(user == null) {
			return null;
		}
		
		CognitoUser userResponse;
		Map<String, String> authParams = new HashMap<>();

		authParams.put("USERNAME", user.getUsername());
		authParams.put("PASSWORD", user.getPassword());

		AdminInitiateAuthRequest adminInitiateAuthRequest = new AdminInitiateAuthRequest()
				.withClientId(this.appConfig.getAwsClientId()).withUserPoolId(this.appConfig.getAwsUserPoolId())
				.withAuthFlow(AuthFlowType.ADMIN_NO_SRP_AUTH).withAuthParameters(authParams);

		AdminInitiateAuthResult result = awsCognitoIdentityProvider.adminInitiateAuth(adminInitiateAuthRequest);

		if (StringUtils.isEmpty(result.getChallengeName())) {
			userResponse = this.findUserByName(user.getUsername());
			userResponse.setIdToken(result.getAuthenticationResult().getIdToken());
			
			return userResponse;
			
		}
		
		userResponse = new CognitoUser();
		userResponse.setChallengeName(result.getChallengeName());

		return userResponse;

	}
	
	/**
	 * creates a user
	 */
	public CognitoUser createUser(CognitoUser user) {
		
		if(user == null) {
			return null;
		}
		
		AdminCreateUserRequest createUserRequest = new AdminCreateUserRequest().withUserPoolId(this.appConfig.getAwsUserPoolId())
				.withUsername(user.getUsername())
				.withUserAttributes(new AttributeType().withName("email").withValue(user.getUsername()),
						new AttributeType().withName("custom:userRole").withValue(user.getRole()),
						new AttributeType().withName("given_name").withValue(user.getGiven_name()),
						new AttributeType().withName("family_name").withValue(user.getFamily_name()),
						new AttributeType().withName("custom:company").withValue(user.getCompany()),
						new AttributeType().withName("custom:createdBy").withValue(user.getCreatedBy()),
						new AttributeType().withName("email_verified").withValue(Boolean.TRUE.toString()))
				.withDesiredDeliveryMediums(DeliveryMediumType.EMAIL).withForceAliasCreation(Boolean.FALSE);

		AdminCreateUserResult createUserResult = awsCognitoIdentityProvider.adminCreateUser(createUserRequest);
		UserType userType = createUserResult.getUser();

		return getUserFromUserType(userType);

	}
	
	/**
	 * finds user by given name
	 */
	public CognitoUser findUserByName(String username) {
		
		if(StringUtils.isEmpty(username)) {
			return null;
		}
		
		AdminGetUserRequest getUserRequest = new AdminGetUserRequest().withUsername(username)
				.withUserPoolId(this.appConfig.getAwsUserPoolId());

		AdminGetUserResult userResult = awsCognitoIdentityProvider.adminGetUser(getUserRequest);
		List<AttributeType> userAttributes = userResult.getUserAttributes();
		CognitoUser user = getUserFromUserAttributes(userAttributes);
		
		user.setUserStatus(userResult.getUserStatus());
		user.setCreatedOn(userResult.getUserCreateDate());
		user.setLastModifiedOn(userResult.getUserLastModifiedDate());

		return user;
	}
	
	/**
	 * deletes given user based on the username
	 */
	public void deleteUser(CognitoUser user) {
		
		if(user == null) {
			return;
		}
		
		AdminDeleteUserRequest deleteUserRequest = new AdminDeleteUserRequest().withUsername(user.getUsername())
				.withUserPoolId(this.appConfig.getAwsUserPoolId());

		awsCognitoIdentityProvider.adminDeleteUser(deleteUserRequest);
	}
	
	/**
	 * returns all the users
	 */
	public Set<CognitoUser> getAllUsers() {

		ListUsersRequest listUsersRequest = new ListUsersRequest().withUserPoolId(this.appConfig.getAwsUserPoolId());

		ListUsersResult lsitUsersResult = awsCognitoIdentityProvider.listUsers(listUsersRequest);

		List<UserType> userTypes = lsitUsersResult.getUsers();
		Set<CognitoUser> users = new HashSet<>();
		
		userTypes.forEach(userType -> users.add(getUserFromUserType(userType)));

		return users;

	}
	
	/**
	 * creates and returns the user from the UserType
	 * 
	 * @param userType
	 * @return
	 */
	private CognitoUser getUserFromUserType(UserType userType) {
		
		CognitoUser user = getUserFromUserAttributes(userType.getAttributes());
		
		user.setUserStatus(userType.getUserStatus());
		
		user.setCreatedOn(userType.getUserCreateDate());
		user.setLastModifiedOn(userType.getUserLastModifiedDate());
		
		return user;
	}
	
	/**
	 * get user from user attributes
	 * 
	 * @param userAttributes
	 * @return
	 */
	private CognitoUser getUserFromUserAttributes(List<AttributeType> userAttributes) {
		CognitoUser user = new CognitoUser();

		userAttributes.forEach(attribute -> {
			if (attribute.getName().equals("email")) {
				user.setUsername(attribute.getValue());
			} else if (attribute.getName().equals("custom:userRole")) {
				user.setRole(attribute.getValue());
			} else if (attribute.getName().equals("given_name")) {
				user.setGiven_name(attribute.getValue());
			} else if (attribute.getName().equals("family_name")) {
				user.setFamily_name(attribute.getValue());
			} else if (attribute.getName().equals("custom:createdBy")) {
				user.setCreatedBy(attribute.getValue());
			} else if (attribute.getName().equals("custom:lastModifiedBy")) {
				user.setLastModifiedBy(attribute.getValue());
			} else if (attribute.getName().equals("custom:company")) {
				user.setCompany(attribute.getValue());
			}
		});
		
		return user;
	}
	
	/**
	 * updates the user based on the username
	 */
	public CognitoUser updateUser(CognitoUser user) {
		
		if(user == null) {
			return null;
		}
		
		List<AttributeType> attributeTypes = new ArrayList<>();
		
		attributeTypes.add(new AttributeType().withName("custom:lastModifiedBy").withValue(user.getLastModifiedBy()));
		
		if(!StringUtils.isEmpty(user.getGiven_name())) {
			attributeTypes.add(new AttributeType().withName("given_name").withValue(user.getGiven_name()));
		}
		
		if(!StringUtils.isEmpty(user.getFamily_name())) {
			attributeTypes.add(new AttributeType().withName("family_name").withValue(user.getFamily_name()));
		}
		
		if(!StringUtils.isEmpty(user.getCompany())) {
			attributeTypes.add(new AttributeType().withName("custom:company").withValue(user.getCompany()));
		}
		
		if(!StringUtils.isEmpty(user.getRole())) {
			attributeTypes.add(new AttributeType().withName("custom:userRole").withValue(user.getRole()));
		}
		
		AdminUpdateUserAttributesRequest updateUserAttributesRequest = new AdminUpdateUserAttributesRequest()
				.withUserPoolId(this.appConfig.getAwsUserPoolId())
				.withUsername(user.getUsername())
				.withUserAttributes(attributeTypes);

		awsCognitoIdentityProvider.adminUpdateUserAttributes(updateUserAttributesRequest);
		
		return user;
	}

	public void deleteUserByName(String username) {
		this.deleteUser(this.findUserByName(username)); //TODO: verify the 404 case
	}
}
