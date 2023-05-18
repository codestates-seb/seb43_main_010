package example.domain.artist.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArtistResponseDto {
    private int artistId;
    private String nickname;
    private String profile;

}
