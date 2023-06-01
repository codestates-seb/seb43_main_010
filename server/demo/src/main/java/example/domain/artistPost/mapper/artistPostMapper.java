package example.domain.artistPost.mapper;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.artist.entity.Artist;
import example.domain.artistPost.dto.artistPostDto;
import example.domain.artistPost.dto.artistPostResponseDto;
import example.domain.artistPost.entity.ArtistPost;
import example.domain.comment.dto.CommentArtistResponseDto;

import example.domain.comment.entity.Comment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.modelmapper.ModelMapper;

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
//    artistPostResponseDto artistToArtistResponseDto(ArtistPost artistPost);

    default artistPostResponseDto artistToArtistResponseDto(ArtistPost artistPost) {
        ModelMapper modelMapper = new ModelMapper();
        artistPostResponseDto artistPostResponseDto = modelMapper.map(artistPost, artistPostResponseDto.class);
        artistPostResponseDto.setArtistPostId(artistPost.getId());

        return artistPostResponseDto;
    }

    List<artistPostResponseDto> artistPostsToArtistResponseDtos(List<ArtistPost> artistPost);

    default CommentArtistResponseDto commentToCommentArtistResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentArtistResponseDto commentArtistResponseDto = new CommentArtistResponseDto();
        Artist artist = comment.getArtist();
        ArtistResponseDto userDto = new ArtistResponseDto();
        userDto.setArtistId(artist.getArtistId());
        userDto.setNickname(artist.getNickname());
        userDto.setProfile(artist.getProfile());
        userDto.setEmail(artist.getEmail());
        userDto.setName(artist.getName());

        commentArtistResponseDto.setArtist(userDto);
        commentArtistResponseDto.setArtistPostId(comment.getArtistPost().getId());
        commentArtistResponseDto.setContent( comment.getContent());
        commentArtistResponseDto.setCreatedAt( comment.getCreatedAt() );
        commentArtistResponseDto.setLikeCount( comment.getLikeCount() );

        return commentArtistResponseDto;
    }

}
