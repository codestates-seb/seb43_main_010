package example.domain.like.entity;

import javax.persistence.*;

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
@Table(name = "like")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "fan_id")
    private Fans fans;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "feedPost_id")
    private FeedPost feedPost;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    public Like(Fans fans, FeedPost feedPost){
        this.fans = fans;
        this.feedPost = feedPost;
    }
}
