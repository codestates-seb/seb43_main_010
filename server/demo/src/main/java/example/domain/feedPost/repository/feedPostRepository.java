package example.domain.feedPost.repository;

import example.domain.feedPost.entity.FeedPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface feedPostRepository extends JpaRepository<FeedPost, Integer>, feedPostCustomRepository {

    List<FeedPost> findFirst10ByOrderByIdDesc();
    List<FeedPost> findByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

//    feedPost findByTitle(String title);
}
