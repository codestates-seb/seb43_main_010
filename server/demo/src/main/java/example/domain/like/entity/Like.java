package example.domain.like.entity;

import javax.persistence.*;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.entity.Comment;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.entity.FeedPost;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fan_id")
    private Fans fans;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "feedPost_id")
    private FeedPost feedPost;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "artistPost_id")
    private ArtistPost artistPost;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    public Like(Fans fans, FeedPost feedPost){
        this.fans = fans;
        this.feedPost = feedPost;
    }

    @Builder
    public Like(Artist artist, ArtistPost artistPost){
        this.artist = artist;
        this.artistPost = artistPost;
    }

    //  @Builder 어노테이션을 사용할 때, 다중 매개변수를 가진 경우에는 직접 빌더 메서드를 추가해야 됨.
    public static LikeBuilder builder() {
        return new LikeBuilder();
    }
    public static class LikeBuilder {
        private Artist artist;
        private ArtistPost artistPost;

        public LikeBuilder artist(Artist artist) {
            this.artist = artist;
            return this;
        }

        public LikeBuilder artistPost(ArtistPost artistPost) {
            this.artistPost = artistPost;
            return this;
        }

        public Like build() {
            return new Like(artist, artistPost);
        }
    }
}
