package example.domain.comment.mapper;


import example.domain.artist.dto.ArtistResponseDto;
import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.dto.CommentResponseDto;
import example.domain.comment.entity.Comment;
import example.domain.fans.dto.FansResponseDto;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface CommentMapper {
    // feedPost에서 fan 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Fans fans, FeedPost feedPost, CommentPostDto requestBody){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setFeedPost(feedPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    // feedPost에서 artist 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Artist artist, FeedPost feedPost,CommentPostDto requestBody){
        Comment comment = new Comment();
        comment.setArtist(artist);
        comment.setFeedPost(feedPost);
        comment.setContent(requestBody.getContent());

        return comment;
    }

    // artistPost에서 fan 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Fans fans, ArtistPost artistPost, CommentPostDto requestBody){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    // artistPost에서 artist 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Artist artist, ArtistPost artistPost, CommentPostDto requestBody){
        Comment comment = new Comment();
        comment.setArtist(artist);
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());

        return comment;
    }


    //  feedPost에서 fan 의 경우 : CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Fans fans, FeedPost feedPost, CommentPatchDto requestBody){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setFeedPost(feedPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    // feedPost에서 artist 의 경우 :  CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Artist artist, FeedPost feedPost, CommentPatchDto requestBody){
        Comment comment = new Comment();
        comment.setArtist(artist);
        comment.setFeedPost(feedPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    //  artistPost에서 fan 의 경우 : CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Fans fans, ArtistPost artistPost, CommentPatchDto requestBody){
        Comment comment = new Comment();
        comment.setFans(fans);
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    // artistPost에서 artist 의 경우 :  CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Artist artist, ArtistPost artistPost, CommentPatchDto requestBody){
        Comment comment = new Comment();
        comment.setArtist(artist);
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }


    // Comment -> CommentResponseDto
    default CommentResponseDto.Fan commentToCommentFanResponseDto(Comment comment){
        CommentResponseDto.Fan commentResponseDto = new CommentResponseDto.Fan();
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    default CommentResponseDto.Artist commentToCommentArtistResponseDto(Comment comment){
        CommentResponseDto.Artist commentResponseDto = new CommentResponseDto.Artist();
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    List<CommentResponseDto.Fan> commentsToFanCommentResponseDtos(List<Comment> comments);

    List<CommentResponseDto.Artist> commentsToArtistCommentResponseDtos(List<Comment> comments);

    List<CommentResponseDto.User> commentsToUserCommentResponseDtos(List<Comment> comments);
}
