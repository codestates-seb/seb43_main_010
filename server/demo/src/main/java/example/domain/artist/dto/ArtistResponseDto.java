package example.domain.artist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class ArtistResponseDto {
    private String content;
    private String email;
    private String name;
    private String nickname;
    private String group;
    private String profile;
    private String groupProfile;
}
