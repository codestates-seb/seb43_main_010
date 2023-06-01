package example.domain.comment.repository;

import example.domain.comment.entity.Comment;


public interface commentCustomRepository {
    void addLikeCount(Comment comment);
    void subLikeCount(Comment comment);
}
