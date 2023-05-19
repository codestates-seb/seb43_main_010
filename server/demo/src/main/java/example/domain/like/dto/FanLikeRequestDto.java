package example.domain.like.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FanLikeRequestDto {
    private int fanId;
    private int feedPostId;

    public FanLikeRequestDto(int fanId, int feedPostId){
        this.fanId = fanId;
        this.feedPostId = feedPostId;
    }
}
