package com.example.demo.comment.entity;

import com.example.demo.fans.entity.Fans;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import com.example.demo.feedPost.entity.feedPost;

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
    @JoinColumn(name = "FEEDPOST_ID")
    private feedPost feedPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAN_ID")
    private Fans fans;

    public Comment(feedPost feedPost, String content, Fans fans) {
        this.feedPost = feedPost;
        this.content = content;
        this.fans = fans;
    }
}
