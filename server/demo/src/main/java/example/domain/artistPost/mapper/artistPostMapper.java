package example.domain.artistPost.mapper;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.artist.entity.Artist;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.dto.artistPostResponseDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentArtistResponseDto;
import example.domain.comment.dto.CommentFanResponseDto;
import example.domain.comment.entity.Comment;
import example.domain.fans.dto.FansResponseDto;
import example.domain.fans.entity.Fans;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface artistPostMapper {

    // artistPostDto.Post -> artistPost
    default ArtistPost artistPostDtoToArtist(artistPostDto.Post requestBody, Artist artist){
        ArtistPost artistPost = new ArtistPost(requestBody.getContent(), requestBody.getImg(), artist);
        return artistPost;
    }

    // artistPostDto.Patch -> artistPost
    default ArtistPost artistPatchDtoToArtist(ArtistPost artistpost, artistPostDto.Patch requestBody, Artist artist){
        ArtistPost artistPost = new ArtistPost(requestBody.getContent(), requestBody.getImg(), artist);
        artistPost.setId(artistpost.getId());
        return artistPost;
    }


    // artistPost -> artistPostDto.Response
//    @Mapping(target = "comments", expression = "java(commentMapper.commentsToCommentResponseDtos(artistPost.getComments()))")
    artistPostResponseDto artistToArtistResponseDto(ArtistPost artistPost);

    List<artistPostResponseDto> artistPostsToArtistResponseDtos(List<ArtistPost> artistPost);

    default CommentArtistResponseDto commentToCommentArtistResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentArtistResponseDto commentArtistResponseDto = new CommentArtistResponseDto();
        Fans fans = comment.getFans();
        ArtistResponseDto userDto = new ArtistResponseDto();
        userDto.setId(fans.getFanId());
        userDto.setNickname(fans.getNickname());
        userDto.setProfile(fans.getProfile());
        userDto.setEmail(fans.getEmail());
        userDto.setName(fans.getName());

        commentArtistResponseDto.setUser(userDto);
        commentArtistResponseDto.setFeedPostId(comment.getFeedPost().getId());
        commentArtistResponseDto.setContent( comment.getContent() );
        commentArtistResponseDto.setCreatedAt( comment.getCreatedAt() );
        commentArtistResponseDto.setLikeCount( comment.getLikeCount() );

        return commentArtistResponseDto;
    }

}
