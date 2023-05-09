package example.domain.feedPost.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class feedPostResponseDto {
//    private UserDto.Response user; --> user 엔티티 받아와야 함
    private int feedId;
    private String content;
    private String img;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
