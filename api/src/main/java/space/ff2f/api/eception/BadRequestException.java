package space.ff2f.api.eception;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;

import java.util.stream.Collectors;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String message){
        super(message);
    }

    public BadRequestException(BindingResult bindingResult){
        super(bindingResult.getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" ")));
    }
}
