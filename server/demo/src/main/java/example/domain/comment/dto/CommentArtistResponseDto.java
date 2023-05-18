package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentArtistResponseDto {
    private ArtistResponseDto user;
    private int feedPostId; // long -> int
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;
}
