package com.example.demo.feedPost.repository;

import com.example.demo.feedPost.entity.feedPost;

public interface feedPostCustomRepository {
    //구체적인 타입은 추후에 추가

    void addLikeCount(feedPost feedPost);
    void subLikeCount(feedPost feedPost);
}
