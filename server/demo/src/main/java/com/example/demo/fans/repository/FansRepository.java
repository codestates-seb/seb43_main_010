package com.example.demo.fans.repository;

import com.example.demo.fans.entity.Fans;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FansRepository extends JpaRepository<Fans, Integer> {
    Optional<Fans> findByEmail(String email);
}