package example.domain.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class CommentPostDto { // 요청

    @NoArgsConstructor
    @Getter
    @Setter
    public static class FanPostDto{

        private int fanId;
        private int id; //feedPostId
        private String content;
        private String img;

        public FanPostDto(int fansId, int id, String content, String img) {
            this.fanId = fansId;
            this.id = id;
            this.content = content;
            this.img = img;
        }
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class ArtistPostDto{
        private int artistId;
        private int id; // artistPostId
        private String content;
        private String img;

        public ArtistPostDto(int artistId, int id, String content, String img) {
            this.artistId = artistId;
            this.id = id;
            this.content = content;
            this.img = img;
        }
    }
}
