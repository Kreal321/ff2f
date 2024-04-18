package space.ff2f.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.ff2f.api.dto.core.DataResponse;
import space.ff2f.api.security.JwtProvider;
import space.ff2f.api.service.AccountService;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    private final AccountService accountService;
    private final JwtProvider jwtProvider;

    @Autowired
    public UserController(AccountService accountService, JwtProvider jwtProvider) {
        this.accountService = accountService;
        this.jwtProvider = jwtProvider;
    }

    @PatchMapping("/account/verify")
    public ResponseEntity<DataResponse> userVerify(@RequestParam("token") Optional<String> token){

//        UserResponse user = this.userService.userVerify(token);

        return ResponseEntity.ok(DataResponse.success("Hello World!"));
    }


}
