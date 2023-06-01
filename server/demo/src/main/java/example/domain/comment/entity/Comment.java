package example.domain.comment.entity;

import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.fans.entity.Fans;
import example.domain.group.entity.Group;
import example.domain.like.entity.Like;
import example.global.common.global.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import example.domain.feedPost.entity.FeedPost;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Comment extends BaseTimeEntity {
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

    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

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
        this.content = content;
        this.artist = artist;
    }
    public Comment(ArtistPost artistPost, String content, Artist artist) {
        this.artistPost = artistPost;
        this.content = content;
        this.artist = artist;
    }

    @Builder
    public Comment(int id, String content, LocalDateTime createdAt, FeedPost feedPost,
                   ArtistPost artistPost, Fans fan, Group group, List<Like> likes,
                   Artist artist, Integer likeCount) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.feedPost = feedPost;
        this.artistPost = artistPost;
        this.fan = fan;
        this.group = group;
        this.likes = likes;
        this.artist = artist;
        this.likeCount = likeCount;
    }
}
