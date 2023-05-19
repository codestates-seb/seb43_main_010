package example.domain.like.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistLikeRequestDto {
    private int artistId;
    private int artistPostId;

    public ArtistLikeRequestDto(int artistId, int artistPostId) {
        this.artistId = artistId;
        this.artistPostId = artistPostId;
    }
}
