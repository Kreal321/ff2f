package space.ff2f.api.aspect;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import space.ff2f.api.dto.core.DataResponse;
import space.ff2f.api.eception.BadRequestException;
import space.ff2f.api.eception.NotFoundException;
import space.ff2f.api.eception.ServerErrorException;

@ResponseBody
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = {BadRequestException.class})
    @Order(5)
    public ResponseEntity<DataResponse> handleBadRequestException(Exception e){
        return ResponseEntity.badRequest().body(DataResponse.error(e.getMessage()));
    }

    @ExceptionHandler(value = {NotFoundException.class})
    @Order(5)
    public ResponseEntity<DataResponse> handleNotFoundException(Exception e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(DataResponse.error(e.getMessage()));
    }

    @ExceptionHandler(value = {ServerErrorException.class})
    @Order(5)
    public ResponseEntity<DataResponse> handleServerErrorException(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(DataResponse.error(e.getMessage()));
    }

//    @ExceptionHandler(value = {Exception.class})
//    public ResponseEntity<DataResponse> handleException(Exception e){
//        e.printStackTrace();
//        return ResponseEntity.badRequest().body(DataResponse.error(e.getMessage()));
//    }

}
