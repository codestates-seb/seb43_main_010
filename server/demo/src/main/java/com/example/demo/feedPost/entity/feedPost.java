package com.example.demo.feedPost.entity;

import com.example.demo.common.global.BaseTimeEntity;
import com.example.demo.fans.entity.Fans;
import com.example.demo.like.entity.Like;
import com.example.demo.comment.entity.Comment;
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
public class feedPost extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    @Column(length = 100, nullable = false)
    private String content;
    private String img;
    @CreatedDate
    @Column(name = "created_at", updatable = false) // 한번 생성되면 업데이트 수정x
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate // 자동으로 업데이트
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "FAN_ID")
    private Fans fans;


    private Like Like;

    @OneToMany(mappedBy = "feedPost", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ColumnDefault("0")
    @Column(name = "like_count", nullable = false)
    private Integer likeCount;

    public feedPost(String content, String img, Fans fans) {
        this.content = content;
        this.img = img;
        this.fans = fans;
    }

//    @Builder
//    public feedPost(Integer id, String content, String img, LocalDateTime createdAt, LocalDateTime modifiedAt,
//                    Fans fans, com.example.demo.like.entity.Like like, List<Comment> comments, Integer likeCount) {
//        this.id = id;
//        this.content = content;
//        this.img = img;
//        this.createdAt = createdAt;
//        this.modifiedAt = modifiedAt;
//        this.fans = fans;
//        this.like = like;
//        this.comments = comments;
//        this.likeCount = likeCount;
//    }
}
