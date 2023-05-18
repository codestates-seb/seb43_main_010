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
import example.domain.feedPost.entity.FeedPost;
import example.global.exception.BusinessLogicException;
import example.global.exception.ExceptionCode;
import org.mapstruct.Mapper;
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
        comment.setFans(fans);
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
        comment.setFans(fans);
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
            comment.setFans((Fans) author);
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
            comment.setFans((Fans) author);
        } else if (author instanceof Artist) {
            comment.setArtist((Artist) author);
        }
        comment.setArtistPost(artistPost);
        comment.setContent(requestBody.getContent());
        return comment;
    }

//    //  feedPost에서 fan 의 경우 : CommentPatchDto -> Comment
//    default Comment commentPatchDtoToComment(Fans fans, FeedPost feedPost, CommentPatchDto requestBody){
//        Comment comment = new Comment();
//        comment.setFans(fans);
//        comment.setFeedPost(feedPost);
//        comment.setContent(requestBody.getContent());
//        return comment;
//    }
//
//    // feedPost에서 artist 의 경우 :  CommentPatchDto -> Comment
//    default Comment commentPatchDtoToComment(Artist artist, FeedPost feedPost, CommentPatchDto requestBody){
//        Comment comment = new Comment();
//        comment.setArtist(artist);
//        comment.setFeedPost(feedPost);
//        comment.setContent(requestBody.getContent());
//        return comment;
//    }

//    //  artistPost에서 fan 의 경우 : CommentPatchDto -> Comment
//    default Comment commentPatchDtoToComment(Fans fans, ArtistPost artistPost, CommentPatchDto requestBody){
//        Comment comment = new Comment();
//        comment.setFans(fans);
//        comment.setArtistPost(artistPost);
//        comment.setContent(requestBody.getContent());
//        return comment;
//    }
//
//    // artistPost에서 artist 의 경우 :  CommentPatchDto -> Comment
//    default Comment commentPatchDtoToComment(Artist artist, ArtistPost artistPost, CommentPatchDto requestBody){
//        Comment comment = new Comment();
//        comment.setArtist(artist);
//        comment.setArtistPost(artistPost);
//        comment.setContent(requestBody.getContent());
//        return comment;
//    }


    // Comment -> CommentResponseDto
    default CommentFanResponseDto commentToCommentFanResponseDto(Comment comment) {
        CommentFanResponseDto commentResponseDto = new CommentFanResponseDto();
        Fans fans = comment.getFans();
        FansResponseDto userDto = new FansResponseDto();
        userDto.setFanId(fans.getFanId());
        userDto.setNickname(fans.getNickname());
        userDto.setProfile(fans.getProfile());
        userDto.setEmail(fans.getEmail());
        userDto.setName(fans.getName());

        commentResponseDto.setFans(userDto);
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    default CommentArtistResponseDto commentToCommentArtistResponseDto(Comment comment) {
        CommentArtistResponseDto commentResponseDto = new CommentArtistResponseDto();
        Artist artist = comment.getArtist();
        ArtistResponseDto userDto = new ArtistResponseDto();
        userDto.setId(artist.getId());
        userDto.setNickname(artist.getNickname());
        userDto.setProfile(artist.getProfile());
        userDto.setEmail(artist.getEmail());
        userDto.setName(artist.getName());

        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }

    default CommentUserResponseDto commentToUserCommentResponseDto(Comment comment) {
        CommentUserResponseDto commentResponseDto = new CommentUserResponseDto();
        Fans fans = comment.getFans();
        FansResponseDto userDto1 = new FansResponseDto();
        userDto1.setFanId(fans.getFanId());
        userDto1.setNickname(fans.getNickname());
        userDto1.setProfile(fans.getProfile());
        userDto1.setEmail(fans.getEmail());
        userDto1.setName(fans.getName());

        Artist artist = comment.getArtist();
        ArtistResponseDto userDto2 = new ArtistResponseDto();
        userDto2.setId(artist.getId());
        userDto2.setNickname(artist.getNickname());
        userDto2.setProfile(artist.getProfile());
        userDto2.setEmail(artist.getEmail());
        userDto2.setName(artist.getName());

        commentResponseDto.setFan(userDto1);
        commentResponseDto.setArtist(userDto2);
        commentResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setLikeCount(comment.getLikeCount());

        return commentResponseDto;
    }


//    List<CommentFanResponseDto> commentsToFanCommentResponseDtos(List<Comment> comments);
//
//    List<CommentArtistResponseDto> commentsToArtistCommentResponseDtos(List<Comment> comments);
//
//    List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments);

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

//    default List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments){
//        return comments.stream()
//                .map(this::commentToUserCommentResponseDto)
//                .collect(Collectors.toList());
//    }

    default List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments) {
        List<CommentUserResponseDto> responseDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentUserResponseDto responseDto = new CommentUserResponseDto();

            // Fans 정보 설정
            Fans fans = comment.getFans();
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
                artistResponseDto.setId(artist.getId());
                artistResponseDto.setNickname(artist.getNickname());
                artistResponseDto.setProfile(artist.getProfile());
                artistResponseDto.setName(artist.getName());
                artistResponseDto.setEmail(artist.getEmail());
                responseDto.setArtist(artistResponseDto);
            }

            // Comment 정보 설정
            responseDto.setFeedPostId(comment.getFeedPost().getId());
            responseDto.setContent(comment.getContent());
            responseDto.setCreatedAt(comment.getCreatedAt());
            responseDto.setLikeCount(comment.getLikeCount());

            responseDtos.add(responseDto);
        }

        return responseDtos;
    }


//    default List<CommentUserResponseDto> commentsToUserCommentResponseDtos(List<Comment> comments) {
//        List<CommentUserResponseDto> responseDtos = new ArrayList<>();
//
//        for (Comment comment : comments) {
//            CommentUserResponseDto responseDto = commentToUserCommentResponseDto(comment);
//            FansResponseDto fansResponseDto = createFansResponseDto(comment.getFans());
//            ArtistResponseDto artistResponseDto = createArtistResponseDto(comment.getArtist());
//
//            responseDto.setFan(fansResponseDto);
//            responseDto.setArtist(artistResponseDto);
//            responseDto.setFeedPostId(comment.getFeedPost().getId());
//            responseDto.setContent(comment.getContent());
//            responseDto.setCreatedAt(comment.getCreatedAt());
//            responseDto.setLikeCount(comment.getLikeCount());
//
//            responseDtos.add(responseDto);
//        }
//
//        return responseDtos;
//    }
//
//    private FansResponseDto createFansResponseDto(Fans fans) {
//        FansResponseDto fansResponseDto = new FansResponseDto();
//        fansResponseDto.setId(fans.getId());
//        fansResponseDto.setNickname(fans.getNickname());
//        fansResponseDto.setProfile(fans.getProfile());
//        return fansResponseDto;
//    }
//
//    private ArtistResponseDto createArtistResponseDto(Artist artist) {
//        ArtistResponseDto artistResponseDto = new ArtistResponseDto();
//        artistResponseDto.setId(artist.getId());
//        artistResponseDto.setNickname(artist.getNickname());
//        artistResponseDto.setProfile(artist.getProfile());
//        return artistResponseDto;
//    }
}
