package space.ff2f.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import space.ff2f.api.documents.account.Role;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    boolean existsByRoleName(String roleName);
    Optional<Role> findByRoleName(String roleName);
}
