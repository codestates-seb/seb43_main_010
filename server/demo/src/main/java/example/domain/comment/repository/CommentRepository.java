package example.domain.comment.repository;

import example.domain.comment.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = "SELECT * FROM answer WHERE feedPost_Id = :feedPostId", nativeQuery = true)
    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId);

    List<Comment> findFirst10ByOrderByIdDesc();
    List<Comment> findByIdLessThanOrderByIdDesc(Integer id, Pageable pageable);
}
