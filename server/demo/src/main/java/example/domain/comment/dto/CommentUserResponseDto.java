package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentUserResponseDto {
    private FansResponseDto fan;
    private ArtistResponseDto artist;
    private int feedPostId; // long -> int
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;
}
