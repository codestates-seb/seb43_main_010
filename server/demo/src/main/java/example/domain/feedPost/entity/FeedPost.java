package example.domain.feedPost.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import example.global.common.global.BaseTimeEntity;
import example.domain.fans.entity.Fans;
import example.domain.like.entity.Like;
import example.domain.comment.entity.Comment;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
    @Column(name = "created_at", updatable = false) // 한번 생성되면 업데이트 수정x
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate // 자동으로 업데이트
    @Column(name = "last_modified_at")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "fan_id")
//    @JsonIgnore
    private Fans fans;


//    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
//    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ColumnDefault("0")
    @Column(name = "like_count", nullable = false)
    private Integer likeCount;

    public FeedPost(String content, String img, Fans fans) {
        this.content = content;
        this.img = img;
        this.fans = fans;
    }

    @Builder
    public FeedPost(Integer id, String content, String img, LocalDateTime createdAt, LocalDateTime modifiedAt,
                    Fans fans, List<Comment> comments, Integer likeCount) {
        this.id = id;
        this.content = content;
        this.img = img;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.fans = fans;
        this.comments = comments;
        this.likeCount = likeCount;
    }
}
