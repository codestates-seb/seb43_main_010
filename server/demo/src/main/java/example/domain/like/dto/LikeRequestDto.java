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
    private Integer commentId;
    private Integer groupId;

    public LikeRequestDto(Integer fanId, Integer artistId, Integer feedPostId, Integer artistPostId, Integer commentId, Integer groupId) {
        this.fanId = fanId;
        this.artistId = artistId;

        // feedPostId와 artistPostId가 동시에 제공되는 경우 예외 처리
        if (feedPostId != null && artistPostId != null) {
            throw new IllegalArgumentException("Invalid LikeRequestDto construction. Either feedPostId or artistPostId should be provided exclusively.");
        }

        this.feedPostId = feedPostId;
        this.artistPostId = artistPostId;
        this.commentId = commentId;
        this.groupId = groupId;
    }
}

//    public LikeRequestDto(Integer fanId, Integer artistId, Integer feedPostId, Integer artistPostId, Integer commentId, Integer groupId) {
//        this.fanId = fanId;
//        this.artistId = artistId;
//        this.feedPostId = feedPostId;
//        this.artistPostId = artistPostId;
//        this.commentId = commentId;
//        this.groupId = groupId;
//    }
//}