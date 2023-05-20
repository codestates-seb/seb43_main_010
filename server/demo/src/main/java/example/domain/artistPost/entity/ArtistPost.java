package example.domain.artistPost.entity;

import example.domain.artist.entity.Artist;
import example.domain.comment.entity.Comment;
import example.domain.fans.entity.Fans;
import example.domain.group.entity.Group;
import example.domain.like.entity.Like;
import example.global.common.global.BaseTimeEntity;
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
@Table(name = "artistPost")
public class ArtistPost extends BaseTimeEntity{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
//        @Column(name = "artistPost_id")
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

        @OneToMany(mappedBy = "artistPost", cascade = CascadeType.REMOVE)
        private List<Like> likes = new ArrayList<>();

        @OneToMany(mappedBy = "artistPost", cascade = CascadeType.REMOVE) // 엔티티가 삭제 될 때 함께 삭제
        private List<Comment> comments = new ArrayList<>(); // null일 경우도 사용 가능

        @ColumnDefault("0")
        @Column(name = "like_count")
        private Integer likeCount;

        public ArtistPost(String content, List<String> img, Artist artist) {
                this.content = content;
                this.img = img;
                this.artist = artist;
        }

        public ArtistPost(int id, Artist artist) {
                this.id = id;
                this.artist = artist;
        }


        @Builder
        public ArtistPost(Integer id, String content, List<String> img, LocalDateTime createdAt,
                          Artist artist, List<Comment> comments, Integer likeCount) {
                this.id = id;
                this.content = content;
                this.img = img;
                this.createdAt = createdAt;
                this.artist = artist;
                this.comments = comments;
                this.likeCount = likeCount;
        }
}
