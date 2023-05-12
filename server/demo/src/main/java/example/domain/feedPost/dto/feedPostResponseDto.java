package example.domain.feedPost.dto;

import example.domain.comment.entity.Comment;
import example.domain.fans.dto.FansResponseDto;
import example.domain.like.entity.Like;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class feedPostResponseDto {
    private FansResponseDto fans;
    private int feedPostId = 1; // 초기값을 1로 설정
    private String content;
    private String img;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @NotNull
    private List<Like> likeList = new ArrayList<>();;

    private List<Comment> comments = new ArrayList<>();

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
