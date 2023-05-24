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
    public Like(Fans fans, FeedPost feedPost) {
        this.fans = fans;
        this.feedPost = feedPost;
    }

    @Builder
    public Like(Artist artist, ArtistPost artistPost) {
        this.artist = artist;
        this.artistPost = artistPost;
    }

    @Builder
    public Like(Fans fans, FeedPost feedPost, Artist artist, ArtistPost artistPost) {
//        if ((fans == null && artist == null) || (fans != null && artist != null)) {
//            throw new IllegalArgumentException("Invalid Like construction. Either artist and artistPost should be provided or neither should be provided.");
//        }
//
//        if ((feedPost == null && artistPost == null) || (feedPost != null && artistPost != null)) {
//            throw new IllegalArgumentException("Invalid Like construction. Either feedPost and artistPost should be provided or neither should be provided.");
//        }

        this.fans = fans;
        this.feedPost = feedPost;
        this.artist = artist;
        this.artistPost = artistPost;
    }


    @Builder
    public Like(Fans fans, FeedPost feedPost, Artist artist, ArtistPost artistPost, Comment comment) {


        this.fans = fans;
        this.feedPost = feedPost;
        this.artist = artist;
        this.artistPost = artistPost;
        this.comment = comment;
    }


    public static LikeBuilder builder() {
        return new LikeBuilder();
    }

    public static class LikeBuilder {
        private Fans fans;
        private FeedPost feedPost;
        private Artist artist;
        private ArtistPost artistPost;
        private Comment comment;

        public LikeBuilder fans(Fans fans) {
            this.fans = fans;
            return this;
        }

        public LikeBuilder feedPost(FeedPost feedPost) {
            this.feedPost = feedPost;
            return this;
        }

        public LikeBuilder artist(Artist artist) {
            this.artist = artist;
            return this;
        }

        public LikeBuilder artistPost(ArtistPost artistPost) {
            this.artistPost = artistPost;
            return this;
        }

        public LikeBuilder comment(Comment comment) {
            this.comment = comment;
            return this;
        }


        public Like build() {
//            if ((fans == null && artist == null) || (fans != null && artist != null)) {
//                throw new IllegalArgumentException("Invalid Like construction. Either artist and artistPost should be provided or neither should be provided.");
//            }
//
//            if ((feedPost == null && artistPost == null) || (feedPost != null && artistPost != null)) {
//                throw new IllegalArgumentException("Invalid Like construction. Either feedPost and artistPost should be provided or neither should be provided.");
//            }

            return new Like(fans, feedPost, artist, artistPost);
        }

        public Like buildWithComment() {

            if ((fans == null && artist == null) || (fans != null && artist != null)) {
                throw new IllegalArgumentException("Invalid Like construction. Either artist and artistPost should be provided or neither should be provided.");
            }

            if (comment == null) {
                throw new IllegalArgumentException("Invalid Like construction. comment should be provided.");
            }

            return new Like(fans, feedPost, artist, artistPost, comment);
        }
    }
}
