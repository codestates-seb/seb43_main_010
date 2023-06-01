package example.domain.comment.repository;

import example.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> , commentCustomRepository {
    @Query(value = "SELECT * FROM comment WHERE feedPost_Id = :feedPostId", nativeQuery = true)
    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId);

    Page<Comment> findAllByFeedPostId(Integer feedPostId, Pageable pageable);


    //    @Query(value = "SELECT * FROM answer WHERE artistPost_Id = :artistPostId", nativeQuery = true)
//    List<Comment> findAllByArtistPostId(@Param("artistPostId") int artistPostId);
    Page<Comment> findAllByArtistPostId(Integer artistPostId, Pageable pageable);

}
