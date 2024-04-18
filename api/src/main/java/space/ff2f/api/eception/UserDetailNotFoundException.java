package space.ff2f.api.eception;

public class UserDetailNotFoundException extends RuntimeException{
    public UserDetailNotFoundException(){
        super("User Detail Not Found. Token is invalid.");
    }

}
