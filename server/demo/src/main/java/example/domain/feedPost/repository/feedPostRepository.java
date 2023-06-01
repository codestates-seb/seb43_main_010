package example.domain.feedPost.repository;

import example.domain.feedPost.entity.FeedPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface feedPostRepository extends JpaRepository<FeedPost, Integer> , feedPostCustomRepository {

    Page<FeedPost> findAllByGroupId(Integer groupId, Pageable pageable);

//
//    @Modifying
//    @Query("UPDATE FeedPost f SET f.likeCount = f.likeCount + 1 WHERE f.id = :postId")
//    void addLikeCount(@Param("postId") Long postId);
//
//    @Modifying
//    @Query("UPDATE FeedPost f SET f.likeCount = CASE WHEN f.likeCount > 0 THEN f.likeCount - 1 ELSE 0 END WHERE f.id = :postId")
//    void subLikeCount(@Param("postId") Long postId);

}
