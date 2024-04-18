package space.ff2f.api.service;

import lombok.Synchronized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.ff2f.api.documents.account.User;
import space.ff2f.api.dto.account.UserDTO;
import space.ff2f.api.dto.account.UserLoginRequest;
import space.ff2f.api.dto.account.UserRegisterRequest;
import space.ff2f.api.eception.BadRequestException;
import space.ff2f.api.service.account.RoleService;
import space.ff2f.api.service.account.UserService;
import space.ff2f.api.util.PasswordUtil;
import space.ff2f.api.util.account.RoleName;
import space.ff2f.api.util.mapper.UserMapper;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class AccountService {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AccountService(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Transactional
    @Synchronized
    public UserDTO userRegister(UserRegisterRequest userRequest, HttpServletRequest request) {
        User user = UserMapper.convertToUser(userRequest);
        user.setLastLoginClient(request.getHeader("User-Agent"));
        user.setLastLoginIp(request.getRemoteAddr());
        user.renewOneTimePassword();
        user.setActive(true);
        user.setScore(0);
        user.addRole(RoleName.ROLE_EMAIL_NOT_VERIFIED);
        this.userService.createUser(user);
        return UserMapper.convertToUserDTO(user);

    }

    public UserDTO userLogin(UserLoginRequest userRequest, HttpServletRequest httpRequest) {
        Optional<User> userOptional = Optional.empty();
        if (userRequest.getUsername() != null) {
            userOptional = this.userService.getUserByUsername(userRequest.getUsername());
        } else if (userRequest.getEmail() != null) {
            userOptional = this.userService.getUserByEmail(userRequest.getEmail());
        } else {
            throw new BadRequestException("Username or email is required");
        }

        User user = userOptional.orElseThrow(() -> new BadRequestException("User not found. Invalid username or email."));

        if (user.getLastLoginIp().equals(httpRequest.getRemoteAddr()) && user.getLastLoginClient().equals(httpRequest.getHeader("User-Agent"))) {
            return UserMapper.convertToUserDTO(this.userService.renewUserPassword(user));
        }

        if (user.getOneTimePassword().equals(userRequest.getOneTimePassword())) {
            user.setLastLoginClient(httpRequest.getHeader("User-Agent"));
            user.setLastLoginIp(httpRequest.getRemoteAddr());
            return UserMapper.convertToUserDTO(this.userService.updateUser(user));
        }

        throw new BadRequestException("Invalid user or password");
    }

    public UserDTO userVerify(Optional<String> token, HttpServletRequest httpRequest) {
        String[] parts = PasswordUtil.decodeBase64String(token.orElseThrow(() -> new BadRequestException("Token is required")));

        if (parts.length != 2) {
            throw new BadRequestException("Invalid token");
        }

        Optional<User> userOptional = this.userService.getUserByEmail(parts[0]);
        User user = userOptional.orElseThrow(() -> new BadRequestException("Invalid token. Email not found."));

        if (!user.getOneTimePassword().equals(parts[1])) {
            throw new BadRequestException("Invalid token. Token does not match.");
        }

        user.removeRole(RoleName.ROLE_EMAIL_NOT_VERIFIED);
        user.addRole(RoleName.ROLE_USER);

        return UserMapper.convertToUserDTO(this.userService.updateUser(user));
    }
}
