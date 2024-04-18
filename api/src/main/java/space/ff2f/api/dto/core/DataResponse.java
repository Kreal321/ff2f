package space.ff2f.api.dto.core;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataResponse {
    private Boolean success;
    private String message;
    private Object data;
    private String token;
    private String location;

    public DataResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static DataResponse error(String message) {
        return new DataResponse(false, message);
    }

    public static DataResponse success(String message) {
        return new DataResponse(true, message);
    }

    public DataResponse token(String token) {
        this.token = token;
        return this;
    }

    public DataResponse data(Object data) {
        this.data = data;
        return this;
    }

    public DataResponse location(String location) {
        this.location = location;
        return this;
    }

}
