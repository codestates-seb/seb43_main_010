package example.domain.artistPost.entity;

import example.domain.artist.entity.Artist;
import example.domain.comment.entity.Comment;
import example.global.common.global.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
@Table(name = "artistPost")
public class ArtistPost extends BaseTimeEntity{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "artistPost_id")
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
        @JoinColumn(name = "artist_id")
        private Artist artist;



        @OneToMany(mappedBy = "artistPost", cascade = CascadeType.REMOVE) // 엔티티가 삭제 될 때 함께 삭제
        private List<Comment> comments = new ArrayList<>(); // null일 경우도 사용 가능

        @ColumnDefault("0")
        @Column(name = "like_count", nullable = false)
        private Integer likeCount;

        public ArtistPost(String content, String img, Artist artist) {
            this.content = content;
            this.img = img;
            this.artist = artist;
        }

        public void addComment(Comment comment) {
                comments.add(comment);
                comment.setArtistPost(this);
        }
}
