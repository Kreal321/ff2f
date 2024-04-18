package space.ff2f.api.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import space.ff2f.api.documents.account.User;
import space.ff2f.api.util.account.RoleName;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetail implements UserDetails {

    private List<GrantedAuthority> authorities;
    private String userId;
    private String username;
    private String oneTimePassword;
    private boolean isActive;

    public UserDetail(User user) {
        this.authorities = user.getRoles().stream()
                .map(RoleName::name)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        this.userId = user.getId();
        this.username = user.getUsername();
        this.oneTimePassword = user.getOneTimePassword();
        this.isActive = user.isActive();
    }

    public UserDetail(String userId, String username, List<GrantedAuthority> authorities) {
        this.userId = userId;
        this.username = username;
        this.authorities = authorities;
    }

    public String getUserId() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.oneTimePassword;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
