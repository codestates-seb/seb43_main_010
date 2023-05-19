package example.domain.like.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeRequestDto {
    private Integer fanId;
    private Integer artistId;
    private Integer feedPostId;
    private Integer artistPostId;

    public LikeRequestDto(Integer fanId, Integer artistId, Integer feedPostId, Integer artistPostId) {
        this.fanId = fanId;
        this.artistId = artistId;
        this.feedPostId = feedPostId;
        this.artistPostId = artistPostId;
    }
}