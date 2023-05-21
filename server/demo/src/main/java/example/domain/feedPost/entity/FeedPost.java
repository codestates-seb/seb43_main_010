package example.domain.feedPost.entity;

import example.domain.artist.entity.Artist;
import example.domain.group.entity.Group;
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


    @ElementCollection
    @Lob
    private List<String> img;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


    @ManyToOne
    @JoinColumn(name = "fan_id")
    private Fans fan;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ColumnDefault("0")
    @Column(name = "like_count")
    private Integer likeCount;

    public FeedPost(String content, List<String> img, Fans fan) {
        this.content = content;
        this.img = img;
        this.fan = fan;
    }

    public FeedPost(int id, Fans fan) {
        this.id = id;
        this.fan = fan;
    }

    @Builder
    public FeedPost(Integer id, String content, List<String> img, Group group, LocalDateTime createdAt,
                    Fans fan, List<Comment> comments, Integer likeCount) {
        this.id = id;
        this.content = content;
        this.img = img;
        this.createdAt = createdAt;
        this.fan = fan;
        this.group = group;
        this.comments = comments;
        this.likeCount = likeCount;
    }
}
