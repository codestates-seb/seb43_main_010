package example.domain.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class CommentPostDto { // 요청

    @Positive
    private int feedPostId;

    @Positive
    private int artistPostId;

    private int fanId;

    private int artistId;

    @NotBlank(message = "댓글을 입력하세요.")
    private String content;

}
