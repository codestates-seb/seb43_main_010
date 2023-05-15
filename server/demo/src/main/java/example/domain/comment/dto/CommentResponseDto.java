package example.domain.comment.dto;

import example.domain.artist.dto.ArtistResponseDto;
import example.domain.fans.dto.FansResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class CommentResponseDto {

    @Getter
    @Setter
    public static class Fan {
        private FansResponseDto user;
        private long feedPostId;
        private String content;
        private LocalDateTime createdAt;
        private int likeCount;
    }

    @Getter
    @Setter
    public static class Artist {
        private ArtistResponseDto user;
        private long feedPostId;
        private String content;
        private LocalDateTime createdAt;
        private int likeCount;
    }
    @Getter
    @Setter
    public static class User{
        private FansResponseDto fan;
        private ArtistResponseDto artist;
        private long feedPostId;
        private String content;
        private LocalDateTime createdAt;
        private int likeCount;
    }
}


//@Getter
//@Setter
//public class CommentResponseDto {
//    private FansResponseDto fan;
//    private ArtistResponseDto artist;
//    private long feedPostId;
//    private long commentId;
//    private String content;
//    private LocalDateTime createdAt;
//}