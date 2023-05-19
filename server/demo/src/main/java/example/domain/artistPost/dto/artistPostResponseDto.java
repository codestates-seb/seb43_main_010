package example.domain.artistPost.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.comment.dto.CommentUserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class artistPostResponseDto {
    private ArtistResponseDto artist;
    private Integer feedPostId;
    //    private Integer feedPostId;
    private Integer artistPostId; // artistPostId
    private String content;
    private List<String> img;
    private LocalDateTime createdAt;
    private List<CommentUserResponseDto> comments;
    private int likeCount;
}
