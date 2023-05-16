package example.domain.feedPost.entity;

import example.domain.artist.entity.Artist;
import example.global.common.global.BaseTimeEntity;
import example.domain.fans.entity.Fans;
import example.domain.like.entity.Like;
import example.domain.comment.entity.Comment;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "feedPost")
public class FeedPost extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 16000, nullable = false)
    private String content;
    private String img;
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


    @ManyToOne
    @JoinColumn(name = "fan_id")
    private Fans fans;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ColumnDefault("0")
    @Column(name = "like_count")
    private Integer likeCount;

    public FeedPost(String content, String img, Fans fans) {
        this.content = content;
        this.img = img;
        this.fans = fans;
    }

    public FeedPost(int id, Fans fans) {
        this.id = id;
        this.fans = fans;
    }

    @Builder
    public FeedPost(Integer id, String content, String img, LocalDateTime createdAt,
                    Fans fans, List<Comment> comments, Integer likeCount) {
        this.id = id;
        this.content = content;
        this.img = img;
        this.createdAt = createdAt;
        this.fans = fans;
        this.comments = comments;
        this.likeCount = likeCount;
    }
}
