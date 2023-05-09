package example.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {
    @Positive
    private int fanId;
    private String nickName;
    private int feedPostId;
    private int commentId;
    private String content;
    private LocalDateTime createdAt;
}
