package com.example.demo.comment.mapper;


import com.example.demo.comment.dto.CommentPatchDto;
import com.example.demo.comment.dto.CommentPostDto;
import com.example.demo.comment.dto.CommentResponseDto;
import com.example.demo.comment.entity.Comment;
import com.example.demo.fans.entity.Fans;
import com.example.demo.feedPost.entity.feedPost;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface CommentMapper {
    // CommentPostDto -> Answer
    default Comment commentPostDtoToComment(CommentPostDto requestBody, Fans fans, feedPost feedPost){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setContent(requestBody.getContent());
        comment.setFeedPost(feedPost);

        return comment;
    }


    // CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(CommentPatchDto requestBody, Fans fans, feedPost feedPost){
        Comment comment = new Comment(feedPost, requestBody.getContent(), fans);
        comment.setCommentId(requestBody.getCommentId());
        return comment;
    }


    // Comment -> CommentResponseDto
    default CommentResponseDto commentToCommentResponseDto(Comment comment){
        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setCommentId(comment.getCommentId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setFanId(comment.getFans().getId());

        return commentResponseDto;
    }

    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);

}
