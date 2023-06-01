package example.domain.artistPost.repository;

import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.entity.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface artistPostRepository extends JpaRepository<ArtistPost, Integer> , artistPostCustomRepository { // , artistPostCustomRepository
    Page<ArtistPost> findAllByGroupId(Integer groupId, Pageable pageable);
}
