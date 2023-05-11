package example.domain.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentPatchDto {

    private int fanId;
    private int artistId;
    private int commentId;
    private String content; // 내용 수정

    public CommentPatchDto(int fanId, int commentId, String content) {
        this.fanId = fanId;
        this.commentId = commentId;
        this.content = content;
    }
}
