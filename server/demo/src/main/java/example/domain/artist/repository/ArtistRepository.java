package example.domain.artist.repository;

import example.domain.artist.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
    Optional<Artist> findByEmail(String email);
   
    boolean existsByEmail(String email);
}