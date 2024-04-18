package space.ff2f.api.dto.account;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserRegisterRequest {
    @NotBlank(message = "Username should not be blank.")
    private String username;
    @NotBlank(message = "Email should not be blank.")
    @Email(message = "Email format is invalid.")
    private String email;
    @NotBlank(message = "Preferred name should not be blank.")
    private String preferredName;
}
