package example.domain.fans.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FansPostDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min=8,max=15)
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String nickname;

    private String profile;
}
