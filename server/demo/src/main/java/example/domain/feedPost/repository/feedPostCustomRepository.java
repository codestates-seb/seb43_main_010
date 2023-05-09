package example.domain.feedPost.repository;

import example.domain.feedPost.entity.FeedPost;

public interface feedPostCustomRepository {
    //구체적인 타입은 추후에 추가

    void addLikeCount(FeedPost feedPost);
    void subLikeCount(FeedPost feedPost);
}
