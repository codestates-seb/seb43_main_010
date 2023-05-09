package com.example.demo.feedPost.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class feedPostDto {
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @NotNull
        private int fansId;

        @NotNull
        private String content;

        @NotNull
        private String img;

        public Post(int fansId, String content, String img) {
            this.fansId = fansId;
            this.content = content;
            this.img = img;
        }
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @NotNull
        private int fansId;
        private String content;
        private String img;
        private int feedPostId;

        public Patch(int fansId, String content, String img, int feedPostId) {
            this.fansId = fansId;
            this.content = content;
            this.img = img;
            this.feedPostId = feedPostId;
        }
    }
}
