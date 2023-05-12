package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {
    private FansResponseDto fan;
    private ArtistResponseDto artist;
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