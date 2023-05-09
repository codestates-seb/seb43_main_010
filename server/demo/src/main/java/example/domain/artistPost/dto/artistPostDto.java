package example.domain.artistPost.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class artistPostDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @NotNull
        private int artistId;

        @NotNull
        private String content;

        @NotNull
        private String img;

        public Post(int artistId, String content, String img) {
            this.artistId = artistId;
            this.content = content;
            this.img = img;
        }
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @NotNull
        private int artistId;
        private String content;
        private String img;
        private int artistPostId;

        public Patch(int artistId, String content, String img, int artistPostId) {
            this.artistId = artistId;
            this.content = content;
            this.img = img;
            this.artistPostId = artistPostId;
        }
    }
}
