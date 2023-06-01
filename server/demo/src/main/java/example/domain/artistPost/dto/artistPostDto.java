package example.domain.artistPost.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
        private List<String> img;

        public Post(int artistId, String content, List<String> img) {
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
        private List<String> img;

        public Patch(int artistId, String content, List<String> img) {
            this.artistId = artistId;
            this.content = content;
            this.img = img;
        }
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Delete {
        @NotNull
        private int artistId;

        public Delete(int fansId) {
            this.artistId = fansId;
        }
    }
}
