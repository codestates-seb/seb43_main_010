package example.domain.comment.entity;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.fans.entity.Fans;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import example.domain.feedPost.entity.FeedPost;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @Column(length = 16000, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedPostId")
    private FeedPost feedPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistPostId")
    private ArtistPost artistPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fanId")
    private Fans fans;

//    @Column(name = "fan_comment_id")
//    private int fanCommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistId")
    private Artist artist;

    @ColumnDefault("0")
    @Column(name = "like_count")
    private Integer likeCount;

    public Comment(String content) {
        this.content = content;
    }
    public Comment(String content, Artist artist) {
        this.content = content;
        this.artist = artist;
    }
    public Comment(ArtistPost artistPost, String content, Artist artist) {
        this.artistPost = artistPost;
        this.content = content;
        this.artist = artist;
    }
}
