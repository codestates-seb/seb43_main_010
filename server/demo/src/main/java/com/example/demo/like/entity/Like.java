package com.example.demo.like.entity;

import javax.persistence.*;

import com.example.demo.comment.entity.Comment;
import com.example.demo.fans.entity.Fans;
import com.example.demo.feedPost.entity.feedPost;
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
    private feedPost feedPost;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    public Like(Fans fans, feedPost feedPost){
        this.fans = fans;
        this.feedPost = feedPost;
    }
}
