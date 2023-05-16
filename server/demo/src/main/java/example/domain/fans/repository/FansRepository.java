package example.domain.fans.repository;

import example.domain.fans.entity.Fans;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FansRepository extends JpaRepository<Fans, Integer> {
    Optional<Fans> findByEmail(String email);
    boolean existsByEmail(String email);
}