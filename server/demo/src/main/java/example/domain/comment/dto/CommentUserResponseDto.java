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
    private Integer commentId;
    private Integer feedPostId;
    private Integer artistPostId;
    private String content;
    private LocalDateTime createdAt;
    private int likeCount;
}
