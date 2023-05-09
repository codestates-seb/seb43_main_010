package example.domain.comment.entity;

import example.domain.fans.entity.Fans;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private int commentId;

    @Column(length = 16000, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedPost_iD")
    private FeedPost feedPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAN_ID")
    private Fans fans;

    public Comment(FeedPost feedPost, String content, Fans fans) {
        this.feedPost = feedPost;
        this.content = content;
        this.fans = fans;
    }
}
