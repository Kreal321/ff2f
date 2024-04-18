package space.ff2f.api.dto.account;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String username;
    private String email;
    private String oneTimePassword;
}