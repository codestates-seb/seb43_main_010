package example.domain.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class CommentPatchDto {

    @NotNull
    private String email;
    @NotNull
    private String content; // 내용 수정

    public CommentPatchDto(String email, String content) {
        this.email = email;
        this.content = content;
    }

}
