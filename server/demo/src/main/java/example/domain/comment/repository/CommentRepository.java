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
public interface CommentRepository extends JpaRepository<Comment, Integer> {
/*  <원래 잘 작동했던 코드>
    @Query(value = "SELECT * FROM comment WHERE feedPost_Id = :feedPostId", nativeQuery = true)
    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId);

    Page<Comment> findAllByFeedPostId(Integer feedPostId, Pageable pageable);

        @Query(value = "SELECT * FROM comment WHERE artistPost_Id = :artistPostId", nativeQuery = true)
    List<Comment> findAllByArtistPostId(@Param("artistPostId") int artistPostId);
    Page<Comment> findAllByArtistPostId(Integer artistPostId, Pageable pageable);
*/


//
//    @Query(value = "SELECT * FROM comment WHERE feedPost_id = :feedPostId", nativeQuery = true)
//    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId);
////    @Query(value = "SELECT * FROM comment WHERE feedPost_id = :feedPostId order by commentId desc limit :limit", nativeQuery = true)
////    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId, @Param("limit") int limit);
//
//    @Query(value = "SELECT * FROM comment WHERE feedPost_id = :feedPostId",
//            countQuery = "SELECT count(*) FROM comment WHERE feedPost_id = :feedPostId",
//            nativeQuery = true)
//    Page<Comment> findAllByFeedPostId(@Param("feedPostId") Integer feedPostId, Pageable pageable);
//
//
//    @Query(value = "SELECT * FROM comment WHERE artistPost_id = :artistPostId", nativeQuery = true)
//    List<Comment> findAllByArtistPostId(@Param("artistPostId") int artistPostId);
//
//    @Query(value = "SELECT * FROM comment WHERE artistPost_id = :artistPostId",
//            countQuery = "SELECT count(*) FROM comment WHERE artistPost_id = :artistPostId",
//            nativeQuery = true)
//    Page<Comment> findAllByArtistPostId(@Param("artistPostId") Integer artistPostId, Pageable pageable);


    @Query(value = "SELECT * FROM comment WHERE feedPostId = :feedPostId", nativeQuery = true)
    List<Comment> findAllByFeedPostId(@Param("feedPostId") int feedPostId);

    @Query(value = "SELECT * FROM comment WHERE feedPostId = :feedPostId",
            countQuery = "SELECT count(*) FROM comment WHERE feedPostId = :feedPostId",
            nativeQuery = true)
    Page<Comment> findAllByFeedPostId(@Param("feedPostId") Integer feedPostId, Pageable pageable);


    @Query(value = "SELECT * FROM comment WHERE artistPostId = :artistPostId", nativeQuery = true)
    List<Comment> findAllByArtistPostId(@Param("artistPostId") int artistPostId);

    @Query(value = "SELECT * FROM comment WHERE artistPostId = :artistPostId",
            countQuery = "SELECT count(*) FROM comment WHERE artistPostId = :artistPostId",
            nativeQuery = true)
    Page<Comment> findAllByArtistPostId(@Param("artistPostId") Integer artistPostId, Pageable pageable);
}
