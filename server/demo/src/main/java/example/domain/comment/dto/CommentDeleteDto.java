package example.domain.comment.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
@Setter
public class CommentDeleteDto {
    @NotNull
    private String email;
}
