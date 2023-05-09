package com.example.demo.like.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeRequestDto {
    private int fanId;
    private int feedPostId;

    public LikeRequestDto(int fanId, int feedPostId){
        this.fanId = fanId;
        this.feedPostId = feedPostId;
    }
}
