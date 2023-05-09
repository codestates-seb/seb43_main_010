package com.example.demo.comment.service;

import com.example.demo.comment.entity.Comment;
import com.example.demo.comment.repository.CommentRepository;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    /*
    < 댓글 등록>
     */
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment findVerifiedComment(int commentId){ // 요청된 댓글이 DB에 없으면 에러
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    public List<Comment> findVerifiedComments(int feedPostId){ // 요청된 댓글이 DB에 없으면 에러
        List<Comment> optionalComment = commentRepository.findAllByFeedPostId(feedPostId);
        return optionalComment;
    }

    public Comment updateComment(Comment comment){
        Comment findComment = findVerifiedComment(comment.getCommentId());
        if(comment.getFans().getId() != findComment.getFans().getId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_AUTHOR_NOT_MATCH);
        }else{
            Optional.ofNullable(comment.getContent()) // 내용 수정
                    .ifPresent(commentContent -> findComment.setContent(commentContent));
            Optional.ofNullable(comment.getFeedPost())
                    .ifPresent(commentFeedPost -> findComment.setFeedPost(commentFeedPost));
            Optional.ofNullable(comment.getCreatedAt())
                    .ifPresent(commentCreatedAt -> findComment.setCreatedAt(commentCreatedAt)); // 업데이트 날짜 수정

            return commentRepository.save(findComment);
        }
    }

    public void deleteComment(int commentId){
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }

}
