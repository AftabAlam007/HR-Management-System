package com.workbridgehrms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByInvitationToken(String token); // <-- ADD THIS LINE
}