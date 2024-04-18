package space.ff2f.api.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class PasswordUtil {
    // generate one time password, 6 digits
    public static String getRandomPassword() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }

    public static String[] decodeBase64String(String str) {
        byte[] decodedBytes = Base64.getDecoder().decode(str);
        String decodedString = new String(decodedBytes);
        return decodedString.split(":");
    }

    public static String encodeBase64Strings(String... strArr) {
        return Base64.getEncoder().encodeToString(
            String.join(":", strArr).getBytes()
        );
    }
}
