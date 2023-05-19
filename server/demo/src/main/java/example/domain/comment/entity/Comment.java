package example.domain.comment.entity;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.fans.entity.Fans;
import example.domain.group.entity.Group;
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
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 16000, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedPost_id")
    private FeedPost feedPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistPost_id")
    private ArtistPost artistPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id")
    private Fans fan;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

//    @Column(name = "fan_comment_id")
//    private int fanCommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @ColumnDefault("0")
    @Column(name = "like_count")
    private Integer likeCount;

    public Comment(String content) {
        this.content = content;
    }
    public Comment(String content, Artist artist) {
        this.feedPost = feedPost;
        this.content = content;
        this.artist = artist;
    }
    public Comment(ArtistPost artistPost, String content, Artist artist) {
        this.artistPost = artistPost;
        this.content = content;
        this.artist = artist;
    }
}
