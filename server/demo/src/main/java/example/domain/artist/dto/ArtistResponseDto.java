package example.domain.artist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArtistResponseDto {
    private int id;
    private String nickname;
    private String profile;

}
