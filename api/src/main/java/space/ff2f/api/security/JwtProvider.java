package space.ff2f.api.security;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import space.ff2f.api.dto.account.UserDTO;
import space.ff2f.api.util.account.RoleName;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@PropertySource("classpath:application.properties")
public class JwtProvider {

    @Value("$security.jwt.token.key")
    private String key;

    private ObjectMapper mapper;

    @Autowired
    public JwtProvider(ObjectMapper objectMapper) {
        this.mapper = objectMapper;
    }

//    public String createToken(UserDetail userDetail){
//
//        Claims claims = Jwts.claims().setSubject(userDetail.getUsername());
//        claims.put("userId", userDetail.getUserId());
//        return Jwts.builder()
//                .setClaims(claims)
//                .signWith(SignatureAlgorithm.HS256, key)
//                .compact();
//
//    }

    public String createToken(UserDTO user){

        Claims claims = Jwts.claims().setSubject(user.getUsername());
        claims.put("userId", user.getId());
        claims.put("authorities", user.getRoles().stream()
                .map(RoleName::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

    }

    public Optional<UserDetails> resolveToken(HttpServletRequest request){
        String prefixedToken = request.getHeader("Authorization"); // extract token value by key "Authorization"
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(prefixedToken.substring(7))
                    .getBody();

//            final JavaType type =  mapper.getTypeFactory().constructCollectionType(List.class, LinkedHashMap.class);
            List<LinkedHashMap<String, String>> permissions = (List<LinkedHashMap<String, String>>) claims.get("authorities");

            List<GrantedAuthority> authorities = permissions.stream()
                    .map(p -> new SimpleGrantedAuthority(p.get("authority")))
                    .collect(Collectors.toList());

            return Optional.of(new UserDetail(((String) claims.get("userId")), claims.getSubject(), authorities));

        } catch (Exception e) {
            return Optional.empty();
        }

    }
}
