package space.ff2f.api.util.mapper;

import space.ff2f.api.documents.account.User;
import space.ff2f.api.dto.account.UserDTO;
import space.ff2f.api.dto.account.UserRegisterRequest;

public class UserMapper {

    public static User convertToUser(UserRegisterRequest userRegisterRequest) {
        return User.builder()
                .username(userRegisterRequest.getUsername())
                .email(userRegisterRequest.getEmail())
                .preferredName(userRegisterRequest.getPreferredName())
                .build();
    }

    public static UserDTO convertToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .preferredName(user.getPreferredName())
                .isActive(user.isActive())
                .roles(user.getRoles())
                .score(user.getScore())
                .wechatName(user.getWechatName())
                .wechatId(user.getWechatId())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
