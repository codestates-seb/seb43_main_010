package example.domain.fans.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class FansResponseDto {
    private int fanId;
    private int feedPostId;
    private String email;
    private String name;
    private String nickname;
    private String profile;
}
