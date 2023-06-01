package example.domain.feedPost.dto;

import example.domain.comment.dto.CommentFanResponseDto;
//import example.domain.comment.dto.CommentResponseDto;
import example.domain.comment.dto.CommentUserResponseDto;
import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class feedPostResponseDto {
    private FansResponseDto fan;  //여기서  fan로 이름 변경하면 null값 나옴
    //    private int feedPostId = 1; // 초기값을 1로 설정
    private Integer feedPostId; // feedPostId
    //    private Integer artistPostId;
//    private Integer id;
    private Integer artistPostId;
    private String content;
    private List<String> img;
    private LocalDateTime createdAt;
    private List<CommentUserResponseDto> comments;
    private int likeCount;

}
//
//    // feedPost 일때 좋아요 응답
//    public static LikeResponseDto feedPostCreateByEntity(feedPost entity){
//        LikeResponseDto dto = new LikeResponseDto();
//        dto.setUser(entity.getUser().getNickName());
//        dto.setCommentId(entity.getComment().getCommentId());
//        dto.setContent(entity.getContent());
//        dto.setCreateAt(entity.getCreatedAt());
//        dto.setCheck(entity.getLikes().isCheck());
//        dto.setTotal(entity.getLikes().getTotal().stream()
//                .mapToInt(Total::getTotal)
//                .sum());
//        return dto;
//    }
