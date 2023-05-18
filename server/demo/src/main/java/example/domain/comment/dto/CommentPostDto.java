package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@Getter
@Setter
public class CommentPostDto { // 요청

        @NotNull
        private String email;
        @NotNull
        private String content;


}
