package example.domain.like.repository;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.entity.FeedPost;
import example.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByFansAndFeedPost(Fans fans, FeedPost feedpost);
    Optional<Like> findByArtistAndArtistPost(Artist artist, ArtistPost artistpost);

}
