package example.domain.artistPost.repository;

import example.domain.artistPost.entity.ArtistPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface artistPostRepository extends JpaRepository<ArtistPost, Integer> {
    List<ArtistPost> findFirst10ByOrderByIdDesc();
    List<ArtistPost> findByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
}
