package example.domain.comment.mapper;


import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.dto.CommentResponseDto;
import example.domain.comment.entity.Comment;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.entity.FeedPost;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface CommentMapper {
    // CommentPostDto -> Answer
    default Comment commentPostDtoToComment(CommentPostDto.FanPostDto requestBody, Fans fans, FeedPost feedPost){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setContent(requestBody.getContent());
        comment.setFeedPost(feedPost);

        return comment;
    }

    default Comment commentPostDtoToComment(CommentPostDto.ArtistPostDto requestBody, Artist artist, ArtistPost artistPost){
        Comment comment = new Comment();
        comment.setArtist(artist);
        comment.setContent(requestBody.getContent());
        comment.setArtistPost(artistPost);

        return comment;
    }


    // CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(CommentPatchDto requestBody, Fans fans, FeedPost feedPost){
        Comment comment = new Comment(feedPost, requestBody.getContent(), fans);
        comment.setId(requestBody.getCommentId());
        return comment;
    }


    // Comment -> CommentResponseDto
    default CommentResponseDto commentToCommentResponseDto(Comment comment){
        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setCommentId(comment.getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setFanId(comment.getFans().getId());

        return commentResponseDto;
    }

    List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments);

}
