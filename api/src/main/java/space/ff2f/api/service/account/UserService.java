package space.ff2f.api.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import space.ff2f.api.documents.account.User;
import space.ff2f.api.eception.BadRequestException;
import space.ff2f.api.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User createUser(User user) {
        assert user != null;
        if (this.userNameExists(user.getUsername())) {
            throw new BadRequestException("Username already exists");
        }
        if (this.emailExists(user.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        return this.userRepository.save(user);
    }

    public boolean userNameExists(String username) {
        assert username != null;
        return this.userRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        assert email != null;
        return this.userRepository.existsByEmail(email);
    }

    public Optional<User> getUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    /**
     * Renew user's one-time password
     * @param user User to renew password
     * @return User with renewed password
     */
    public User renewUserPassword(User user) {
        assert user != null && user.getId() != null;
        user.renewOneTimePassword();
        return this.userRepository.save(user);
    }

    /**
     * Update user's info, one-time password will also be renewed
     * @param user User to update
     * @return Updated user
     */
    public User updateUser(User user) {
        assert user != null && user.getId() != null;
        user.renewOneTimePassword();
        return this.userRepository.save(user);
    }
}
