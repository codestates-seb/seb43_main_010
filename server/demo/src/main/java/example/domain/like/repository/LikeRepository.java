package example.domain.like.repository;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.entity.Comment;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.entity.FeedPost;
import example.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByFansAndFeedPost(Fans fans, FeedPost feedpost);
    Optional<Like> findByArtistAndFeedPost(Artist artist, FeedPost feedpost);
    Optional<Like> findByFansAndArtistPost(Fans fans, ArtistPost artistPost);
    Optional<Like> findByArtistAndArtistPost(Artist artist, ArtistPost artistpost);

    Optional<Like> findByFansAndComment(Fans fans, Comment comment);
    Optional<Like> findByArtistAndComment(Artist artist, Comment comment);

    long countByFans(Fans fans);
    long countByArtist(Artist artist);


}
