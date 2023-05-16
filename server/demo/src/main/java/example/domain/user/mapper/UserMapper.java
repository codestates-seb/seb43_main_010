package example.domain.user.mapper;

import example.domain.fans.dto.FansPostDto;
import example.domain.fans.dto.FansResponseDto;
import example.domain.fans.entity.Fans;
import example.domain.user.dto.UserPostDto;
import example.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.springframework.util.StringUtils;

@Mapper(componentModel = "spring")
public interface UserMapper {

    default User userPostDtoToUser(UserPostDto userPostDto) {
        User user = new User();
        user.setEmail(userPostDto.getEmail());
        user.setPassword(userPostDto.getPassword());

        return user;
    }

}
