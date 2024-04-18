package space.ff2f.api.eception;

public class ServerErrorException extends RuntimeException{
    public ServerErrorException(String message){
        super(message);
    }
}
