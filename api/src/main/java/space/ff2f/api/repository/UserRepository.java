package space.ff2f.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import space.ff2f.api.documents.account.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
