package example.domain.feedPost.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class feedPostDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post {
        @NotNull
        private int fanId;

        @NotNull
        private String content;

        @NotNull
        private List<String> img;

        public Post(int fansId, String content, List<String> img) {
            this.fanId = fansId;
            this.content = content;
            this.img = img;
        }
    }

    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch {
        @NotNull
        private int fanId;
        private String content;
        private List<String> img;

        public Patch(int fansId, String content, List<String> img) {
            this.fanId = fansId;
            this.content = content;
            this.img = img;
        }
    }

    @NoArgsConstructor
    @Getter
    @Setter
    public static class Delete {
        @NotNull
        private int fanId;

        public Delete(int fansId) {
            this.fanId = fansId;
        }
    }
}
