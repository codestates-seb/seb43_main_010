package example.domain.comment.dto;

import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentFanResponseDto {
    private FansResponseDto fans;
    private long feedPostId;
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;
}
