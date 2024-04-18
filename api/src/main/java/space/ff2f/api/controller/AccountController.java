package space.ff2f.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import space.ff2f.api.dto.account.UserDTO;
import space.ff2f.api.dto.account.UserLoginRequest;
import space.ff2f.api.dto.account.UserRegisterRequest;
import space.ff2f.api.dto.core.DataResponse;
import space.ff2f.api.eception.BadRequestException;
import space.ff2f.api.security.JwtProvider;
import space.ff2f.api.security.UserDetail;
import space.ff2f.api.service.AccountService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;
    private final JwtProvider jwtProvider;

    @Autowired
    public AccountController(AccountService accountService, JwtProvider jwtProvider) {
        this.accountService = accountService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<DataResponse> userRegister(@Valid @RequestBody UserRegisterRequest userRequest, BindingResult bindingResult, HttpServletRequest httpRequest) throws URISyntaxException {
        if (bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult);
        }

        UserDTO user = this.accountService.userRegister(userRequest, httpRequest);

        return ResponseEntity.created(new URI("/users/" + user.getId()))
                .body(DataResponse.success("User registered!")
                        .data(user)
                        .token(this.jwtProvider.createToken(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<DataResponse> userLogin(@RequestBody UserLoginRequest request, HttpServletRequest httpRequest, @AuthenticationPrincipal UserDetail userDetail) {

        if (userDetail != null){
            return ResponseEntity.ok(DataResponse.success("User already logged in.")
                    .data(userDetail));
        }

        UserDTO user = this.accountService.userLogin(request, httpRequest);

        return ResponseEntity.ok(DataResponse.success("User logged in.")
                .data(user)
                .token(this.jwtProvider.createToken(user)));
    }

    @PostMapping("/verify")
    public ResponseEntity<DataResponse> emailVerify(@RequestParam("token") Optional<String> token, HttpServletRequest httpRequest){

        UserDTO user = this.accountService.userVerify(token, httpRequest);

        return ResponseEntity.ok(DataResponse.success("Email verified.")
                .data(user)
                .token(this.jwtProvider.createToken(user)));
    }


}
