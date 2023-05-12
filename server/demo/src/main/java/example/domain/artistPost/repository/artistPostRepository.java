package example.domain.artistPost.repository;

import example.domain.artistPost.entity.ArtistPost;
import example.domain.feedPost.repository.feedPostCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface artistPostRepository extends JpaRepository<ArtistPost, Integer>, artistPostCustomRepository {

}
