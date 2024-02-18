package com.taskmanagement.dto;

import lombok.Data;

@Data
public class ProjectDto {
	
	private int id;
	
	private String name;
	
	private String description;
	
	private String assignedToManager;
	
	private String assignedToEmployee;
	
	private String projectStatus;
	
    private int employeeId;
	
	private int managerId;
	
	private String managerName;
	
	private String employeeName;
	
	private String requirement;
	
	private String createdDate;
	
	private String assignedDate;
	
	private String deadlineDate;

}
