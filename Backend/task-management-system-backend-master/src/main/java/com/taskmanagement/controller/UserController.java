package com.taskmanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.CommonApiResponse;
import com.taskmanagement.dto.UserLoginRequest;
import com.taskmanagement.dto.UserLoginResponse;
import com.taskmanagement.dto.UserLoginResponseDto;
import com.taskmanagement.dto.UserRoleResponse;
import com.taskmanagement.dto.UsersResponseDto;
import com.taskmanagement.entity.User;
import com.taskmanagement.service.CustomUserDetailsService;
import com.taskmanagement.service.UserService;
import com.taskmanagement.utility.Constants.Sex;
import com.taskmanagement.utility.Constants.UserRole;
import com.taskmanagement.utility.Constants.UserStatus;
import com.taskmanagement.utility.JwtUtil;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	Logger LOG = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtUtil jwtUtil;
	
	@GetMapping("gender")
	@ApiOperation(value = "Api to get all user gender")
	public ResponseEntity<?> getAllUserGender() {
		LOG.info("Recieved request for getting all the user gender");
		
		UserRoleResponse response = new UserRoleResponse();
		List<String> genders = new ArrayList<>();
		
		for(Sex gender : Sex.values() ) {
			genders.add(gender.value());
		}
		
		if(genders.isEmpty()) {
			
			response.setResponseMessage("Failed to Fetch User Genders");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		else {
			response.setGenders(genders);
			response.setResponseMessage("User Genders Fetched success");
			return new ResponseEntity(response, HttpStatus.OK);
		}
		
	}
	
	@PostMapping("admin/register")
	@ApiOperation(value = "Api to register Admin User")
	public ResponseEntity<CommonApiResponse> adminRegister(@RequestBody User user) {
		LOG.info("Recieved request for Admin register");

		CommonApiResponse response = new CommonApiResponse();
		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPassword);
		user.setStatus(UserStatus.ACTIVE.value());
		
		User registerUser = userService.registerUser(user);
		
		if (registerUser != null) {
			response.setSuccess(true);
			response.setResponseMessage(user.getRole() + " Registered Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		response.setSuccess(true);
		response.setResponseMessage("Failed to Register " + user.getRole() + " User");
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);

	}
	
	@PostMapping("manager/register")
	@ApiOperation(value = "Api to register Manager User")
	public ResponseEntity<CommonApiResponse> mangaerRegister(@RequestBody User user) {
		LOG.info("Recieved request for Manager register");

		CommonApiResponse response = new CommonApiResponse();
		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPassword);
		user.setStatus(UserStatus.ACTIVE.value());

		User registerUser = userService.registerUser(user);
		
		if (registerUser != null) {
			response.setSuccess(true);
			response.setResponseMessage(user.getRole() + " Registered Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		response.setSuccess(true);
		response.setResponseMessage("Failed to Register " + user.getRole() + " User");
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);

	}
	
	@PostMapping("employee/register")
	@ApiOperation(value = "Api to register Employee User")
	public ResponseEntity<CommonApiResponse> employeeRegister(@RequestBody User user) {
		LOG.info("Recieved request for Employee register");

		CommonApiResponse response = new CommonApiResponse();
		String encodedPassword = passwordEncoder.encode(user.getPassword());

		user.setPassword(encodedPassword);
		user.setStatus(UserStatus.ACTIVE.value());
		
		User registerUser = userService.registerUser(user);
		
		if (registerUser != null) {
			response.setSuccess(true);
			response.setResponseMessage(user.getRole() + " Registered Successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		response.setSuccess(true);
		response.setResponseMessage("Failed to Register " + user.getRole() + " User");
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@PostMapping("login")
	@ApiOperation(value = "Api to login any User")
	public ResponseEntity<UserLoginResponseDto> login(@RequestBody UserLoginRequest userLoginRequest) {
		LOG.info("Recieved request for User Login");
		
		UserLoginResponseDto response = new UserLoginResponseDto();

		String jwtToken = null;
		UserLoginResponse useLoginResponse = new UserLoginResponse();
        User user = null;
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(userLoginRequest.getEmailId(), userLoginRequest.getPassword()));
		} catch (Exception ex) {
			LOG.error("Autthentication Failed!!!");
			response.setSuccess(true);
			response.setResponseMessage("Failed to Login");
			return new ResponseEntity<UserLoginResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLoginRequest.getEmailId());

		for (GrantedAuthority grantedAuthory : userDetails.getAuthorities()) {
			if (grantedAuthory.getAuthority().equals(userLoginRequest.getRole())) {
				jwtToken = jwtUtil.generateToken(userDetails.getUsername());
			}
		}

		// user is authenticated
		if (jwtToken != null) {

			user = userService.getUserByEmailId(userLoginRequest.getEmailId());
			
			useLoginResponse = User.toUserLoginResponse(user);
			useLoginResponse.setJwtToken(jwtToken);
			
			response.setUser(useLoginResponse);

			response.setSuccess(true);
			response.setResponseMessage("Logged in Successful..!!!");
			return new ResponseEntity<UserLoginResponseDto>(response, HttpStatus.OK);
		
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to Log in..!!!");
			return new ResponseEntity<UserLoginResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		
		}
	}
	
	@PostMapping("changePassword")
	@ApiOperation(value = "Api to change the user password")
	public ResponseEntity<CommonApiResponse> userChangePassword(@RequestBody UserLoginRequest user) {
		LOG.info("Recieved request for changing the user password");

		CommonApiResponse response = new CommonApiResponse();
		
		if(user == null) {
			response.setSuccess(true);
			response.setResponseMessage("Failed to change the password");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
		
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		
		User existingUser = this.userService.getUserById(user.getUserId());
		existingUser.setPassword(encodedPassword);

		User updatedUser = userService.registerUser(existingUser);

		if (updatedUser != null) {
			response.setSuccess(true);
			response.setResponseMessage("password changed successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("failed to change the password");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
	}
	
	@DeleteMapping("delete")
	@ApiOperation(value = "Api to delete the user")
	public ResponseEntity<CommonApiResponse> deleteUser(@RequestParam("userId") int userId) {
		LOG.info("Recieved request for deleting the user");

		CommonApiResponse response = new CommonApiResponse();
		
		User user = this.userService.getUserById(userId);
		user.setStatus(UserStatus.DELETED.value());

		User updatedUser = userService.registerUser(user);  // this will update the entry

		if (updatedUser != null) {
			response.setSuccess(true);
			response.setResponseMessage("user deleted successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("failed to delete the user");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
	}
	
	@GetMapping("manager/all")
	public ResponseEntity<UsersResponseDto> getAllManager() {

		LOG.info("recieved request for getting ALL Managers!!!");

		UsersResponseDto response = new UsersResponseDto();
		
		List<User> managers = this.userService.getUsersByRoleAndStatus(UserRole.MANAGER.value(), UserStatus.ACTIVE.value());
		
		response.setUsers(managers);
		response.setSuccess(true);
		response.setResponseMessage("managers fetched successfully");
		return new ResponseEntity<UsersResponseDto>(response, HttpStatus.OK);
	}
	
	@GetMapping("employee/all")
	public ResponseEntity<UsersResponseDto> getAllEmployee() {
		System.out.println("recieved request for getting ALL Employees!!!");
		
		UsersResponseDto response = new UsersResponseDto();
		List<User> employees = this.userService.getUsersByRoleAndStatus(UserRole.EMPLOYEE.value(), UserStatus.ACTIVE.value());
		
		response.setUsers(employees);
		response.setSuccess(true);
		response.setResponseMessage("employees fetched successfully");
		return new ResponseEntity<UsersResponseDto>(response, HttpStatus.OK);
	}
}
