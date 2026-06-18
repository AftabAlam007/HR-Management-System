package com.workbridgehrms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.workbridgehrms.enums.ApplicantStage;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "applicants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Applicant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is mandatory")
	private String name;

	@NotBlank(message = "Email is mandatory")
	@Email(message = "Invalid email format")
	private String email;

	private String resumePath;

	@ManyToOne
	@JoinColumn(name = "job_posting_id")
	private JobPosting jobPosting;

	@Enumerated(EnumType.STRING)
	private ApplicantStage stage;

	@Column(columnDefinition = "TEXT")
	private String notes; // For Internal Notes feature

	@CreationTimestamp
	@Column(updatable = false)
	private LocalDate submitted;

	@UpdateTimestamp
	private LocalDateTime updatedAt;

	private LocalDateTime interviewDateTime;

	private String interviewer;

}