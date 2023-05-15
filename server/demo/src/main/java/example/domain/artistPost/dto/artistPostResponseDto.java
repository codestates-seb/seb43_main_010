package example.domain.artistPost.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.comment.dto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class artistPostResponseDto {
    private ArtistResponseDto artist;
    private Integer id; // artistPostId
    private String content;
    private String img;
    private LocalDateTime createdAt;
    private List<CommentResponseDto> comments;
    private int likeCount;
}
