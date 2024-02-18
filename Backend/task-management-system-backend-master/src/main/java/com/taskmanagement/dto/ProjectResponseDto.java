package com.taskmanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProjectResponseDto extends CommonApiResponse {
	
	List<ProjectDto> projects;
	
}

