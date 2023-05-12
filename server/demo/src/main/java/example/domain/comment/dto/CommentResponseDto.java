package example.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {
    @Positive
    private int fanId;
    private String nickName;
    private long feedPostId;
    private long commentId;
    private String content;
    private LocalDateTime createdAt;
}

/*
    public static class FanResponseDto{
        @NotNull
        @Positive
        private int fanId;
        private String nickName;
        @NotNull
        private String content;
        private long feedPostId;
        @NotNull
        private String img;
        private long commentId;
        private LocalDateTime createdAt;
    }

    public static class ArtistResponseDto{
        @NotNull
        @Positive
        private int artistId;
        private String nickName;
        private String group;
        @NotNull
        private String content;
        private long artistPostId;
        @NotNull
        private String img;
        private long commentId;
        private LocalDateTime createdAt;
    }

 */