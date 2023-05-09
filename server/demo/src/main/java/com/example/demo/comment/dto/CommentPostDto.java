package com.example.demo.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class CommentPostDto { // 요청
    @NotNull
    @Positive
    private int feedPostId;

    @NotNull
    private int fanId;

    @NotBlank(message = "댓글을 입력하세요.")
    private String content;

    public CommentPostDto(int feedPostId, int fanId, String content) {
        this.feedPostId = feedPostId;
        this.fanId = fanId;
        this.content = content;
    }
}
