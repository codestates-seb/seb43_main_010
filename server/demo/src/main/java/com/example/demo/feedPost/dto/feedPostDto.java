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
        private int userId;

        @NotNull
        private String content;

        @NotNull
        private String img;

        public Post(int userId, String content, String img) {
            this.userId = userId;
            this.content = content;
            this.img = img;
        }
    }
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @NotNull
        private int userId;
        private String Content;
        private String img;

        public Patch(int userId, String content, String img) {
            this.userId = userId;
            Content = content;
            this.img = img;
        }
    }
}
