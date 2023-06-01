package example.domain.artistPost.repository;

import example.domain.artistPost.entity.ArtistPost;

public interface artistPostCustomRepository {
    void addLikeCount(ArtistPost artistPost);
    void subLikeCount(ArtistPost artistPost);
}