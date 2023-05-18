package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentArtistResponseDto { // feedPost든 artistPost든 artist가 댓글 작성
    private ArtistResponseDto artist;
    private long artistPostId;
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;
}
