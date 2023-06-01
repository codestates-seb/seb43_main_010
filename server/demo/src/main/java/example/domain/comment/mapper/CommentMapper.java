package example.domain.comment.mapper;


import example.domain.artist.dto.ArtistResponseDto;
import example.domain.artist.entity.Artist;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentArtistResponseDto;
import example.domain.comment.dto.CommentFanResponseDto;
import example.domain.comment.dto.CommentUserResponseDto;
import example.domain.comment.dto.CommentPatchDto;
import example.domain.comment.dto.CommentPostDto;
import example.domain.comment.entity.Comment;
import example.domain.fans.dto.FansResponseDto;
import example.domain.fans.entity.Fans;
import example.domain.feedPost.dto.feedPostResponseDto;
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.mapstruct.Mapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import example.domain.feedPost.service.feedPostService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface CommentMapper {


    // feedPost에서 fan 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(FeedPost feedPost, Fans fans, CommentPostDto requestBody) {
        Comment comment = new Comment(requestBody.getContent());
        comment.setFan(fans);
        comment.setFeedPost(feedPost);
        return comment;
    }

    // feedPost에서 artist 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(FeedPost feedPost, Artist artist, CommentPostDto requestBody) {
        Comment comment = new Comment(requestBody.getContent());
        comment.setArtist(artist);
        comment.setFeedPost(feedPost);
        return comment;
    }

    // artistPost에서 fan 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Fans fans, ArtistPost artistPost, CommentPostDto requestBody) {
        Comment comment = new Comment(requestBody.getContent());
        comment.setFan(fans);
        comment.setArtistPost(artistPost);
        return comment;
    }

    // artistPost에서 artist 의 경우 : CommentPostDto -> comment
    default Comment commentPostDtoToComment(Artist artist, ArtistPost artistPost, CommentPostDto requestBody) {
        Comment comment = new Comment(requestBody.getContent());
        comment.setArtist(artist);
        comment.setArtistPost(artistPost);

        return comment;
    }

    // feedPost에서 fan(artist) 의 경우 : CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Object author, FeedPost feedPost, CommentPatchDto requestBody) {
        Comment comment = new Comment();
        if (author instanceof Fans) {
            comment.setFan((Fans) author);
        } else if (author instanceof Artist) {
            comment.setArtist((Artist) author);
        }
        comment.setFeedPost(feedPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

    //artistPost에서 fan(artist) 의 경우 : CommentPatchDto -> Comment
    default Comment commentPatchDtoToComment(Object author, ArtistPost artistPost, CommentPatchDto requestBody) {
        Comment comment = new Comment();
        if (author instanceof Fans) {
            comment.setFan((Fans) author);
        } else if (author instanceof Artist) {
            comment.setArtist((Artist) author);
        }
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }



    default CommentFanResponseDto commentToCommentFanResponseDto(Comment comment){
        ModelMapper modelMapper = new ModelMapper();
        CommentFanResponseDto commentFanResponseDto = modelMapper.map(comment, CommentFanResponseDto.class);
//        commentFanResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentFanResponseDto.setCommentId(comment.getId());

        return commentFanResponseDto;
    }

    default CommentArtistResponseDto commentToCommentArtistResponseDto(Comment comment){
        ModelMapper modelMapper = new ModelMapper();
        CommentArtistResponseDto commentArtistResponseDto = modelMapper.map(comment, CommentArtistResponseDto.class);
//        commentArtistResponseDto.setArtistPostId(comment.getArtistPost().getId());
        commentArtistResponseDto.setCommentId(comment.getId());

        return commentArtistResponseDto;
    }

    default CommentUserResponseDto commentToUserCommentResponseDto(Comment comment){
        ModelMapper modelMapper = new ModelMapper();
        CommentUserResponseDto commentUserResponseDto = modelMapper.map(comment, CommentUserResponseDto.class);
        commentUserResponseDto.setCommentId(comment.getId());
//        commentUserResponseDto.setFeedPostId(comment.getFeedPost().getId());
//        commentUserResponseDto.setArtistPostId(comment.getArtistPost().getId());

        return commentUserResponseDto;
    }


    default List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments) {
        ModelMapper modelMapper = new ModelMapper();
        TypeToken<List<CommentUserResponseDto>> typeToken = new TypeToken<List<CommentUserResponseDto>>() {};
        List<CommentUserResponseDto> commentUserResponseDto = modelMapper.map(comments, typeToken.getType());

        return commentUserResponseDto;
    }


    /* 여기서부터 쭉 잘되는 코드

    // Comment -> CommentResponseDto
    default CommentFanResponseDto commentToCommentFanResponseDto(Comment comment) {
        CommentFanResponseDto commentResponseDto = new CommentFanResponseDto();
        Fans fans = comment.getFan();
        FansResponseDto userDto = new FansResponseDto();
        userDto.setFanId(fans.getFanId());
        userDto.setNickname(fans.getNickname());
        userDto.setProfile(fans.getProfile());
        userDto.setEmail(fans.getEmail());
        userDto.setName(fans.getName());

        commentResponseDto.setFan(userDto);

        if (comment.getFeedPost() != null) {
            commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        } else {
            commentResponseDto.setFeedPostId(null);
        }

        if (comment.getArtistPost() != null) {
            commentResponseDto.setArtistPostId(comment.getArtistPost().getId());
        } else {
            commentResponseDto.setArtistPostId(null);
        }
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    default CommentArtistResponseDto commentToCommentArtistResponseDto(Comment comment) {
        CommentArtistResponseDto commentResponseDto = new CommentArtistResponseDto();
        Artist artist = comment.getArtist();
        ArtistResponseDto userDto = new ArtistResponseDto();
        userDto.setArtistId(artist.getArtistId());
        userDto.setNickname(artist.getNickname());
        userDto.setProfile(artist.getProfile());
        userDto.setEmail(artist.getEmail());
        userDto.setName(artist.getName());


        commentResponseDto.setArtist(userDto);
        if (comment.getFeedPost() != null) {
            commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        } else {
            commentResponseDto.setFeedPostId(null);
        }

        if (comment.getArtistPost() != null) {
            commentResponseDto.setArtistPostId(comment.getArtistPost().getId());
        } else {
            commentResponseDto.setArtistPostId(null);
        }
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    default CommentUserResponseDto commentToUserCommentResponseDto(Comment comment) {
        CommentUserResponseDto commentResponseDto = new CommentUserResponseDto();

        if (comment != null) {
            Fans fans = comment.getFan();
            if (fans != null) {
                FansResponseDto userDto1 = new FansResponseDto();
                userDto1.setFanId(fans.getFanId());
                userDto1.setNickname(fans.getNickname());
                userDto1.setProfile(fans.getProfile());
                userDto1.setEmail(fans.getEmail());
                userDto1.setName(fans.getName());
                commentResponseDto.setFan(userDto1);
            } else {
                commentResponseDto.setFan(null);
            }

            Artist artist = comment.getArtist();
            if (artist != null) {
                ArtistResponseDto userDto2 = new ArtistResponseDto();
                userDto2.setArtistId(artist.getArtistId());
                userDto2.setNickname(artist.getNickname());
                userDto2.setProfile(artist.getProfile());
                userDto2.setEmail(artist.getEmail());
                userDto2.setName(artist.getName());
                commentResponseDto.setArtist(userDto2);
            } else {
                commentResponseDto.setArtist(null);
            }

            commentResponseDto.setFeedPostId(comment.getFeedPost() != null ? comment.getFeedPost().getId() : null);
            commentResponseDto.setArtistPostId(comment.getArtistPost() != null ? comment.getArtistPost().getId() : null);
            commentResponseDto.setContent(comment.getContent());
            commentResponseDto.setCreatedAt(comment.getCreatedAt());
            commentResponseDto.setLikeCount(comment.getLikeCount());
        }

        return commentResponseDto;
    }


    default List<CommentFanResponseDto> commentsToFanCommentResponseDtos(List<Comment> comments) {
        return comments.stream()
                .map(this::commentToCommentFanResponseDto)
                .collect(Collectors.toList());
    }

    default List<CommentArtistResponseDto> commentsToArtistCommentResponseDtos(List<Comment> comments) {
        return comments.stream()
                .map(this::commentToCommentArtistResponseDto)
                .collect(Collectors.toList());
    }



    default List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments) {
        List<CommentUserResponseDto> responseDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentUserResponseDto responseDto = new CommentUserResponseDto();

            // Fans 정보 설정
            Fans fans = comment.getFan();
            if (fans != null) {
                FansResponseDto fansResponseDto = new FansResponseDto();
                fansResponseDto.setFanId(fans.getFanId());
                fansResponseDto.setNickname(fans.getNickname());
                fansResponseDto.setProfile(fans.getProfile());
                fansResponseDto.setName(fans.getName());
                fansResponseDto.setEmail(fans.getEmail());
                responseDto.setFan(fansResponseDto);
            }

            // Artist 정보 설정
            Artist artist = comment.getArtist();
            if (artist != null) {
                ArtistResponseDto artistResponseDto = new ArtistResponseDto();
                artistResponseDto.setArtistId(artist.getArtistId());
                artistResponseDto.setNickname(artist.getNickname());
                artistResponseDto.setProfile(artist.getProfile());
                artistResponseDto.setName(artist.getName());
                artistResponseDto.setEmail(artist.getEmail());
                responseDto.setArtist(artistResponseDto);
            }

            // Comment 정보 설정
            if (comment.getFeedPost() != null) {
                responseDto.setFeedPostId(comment.getFeedPost().getId());
            } else {
                responseDto.setFeedPostId(null);
            }

            if (comment.getArtistPost() != null) {
                responseDto.setArtistPostId(comment.getArtistPost().getId());
            } else {
                responseDto.setArtistPostId(null);
            }
            responseDto.setContent(comment.getContent());
            responseDto.setCreatedAt(comment.getCreatedAt());
            responseDto.setLikeCount(comment.getLikeCount());

            responseDtos.add(responseDto);
        }

        return responseDtos;
    }

     */
}
