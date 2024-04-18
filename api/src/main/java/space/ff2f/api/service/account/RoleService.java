package space.ff2f.api.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import space.ff2f.api.documents.account.Role;
import space.ff2f.api.eception.NotFoundException;
import space.ff2f.api.repository.RoleRepository;

import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role createRole(Role role) {
        assert role != null;
        return this.getRole(role.getRoleName())
                .orElseGet(() -> this.roleRepository.save(role));
    }

    public boolean roleExists(String roleName) {
        return this.roleRepository.existsByRoleName(roleName);
    }

    public Optional<Role> getRole(String roleName) {
        return this.roleRepository.findByRoleName(roleName);
    }

    public Role updateRoleDescription(String roleName, String roleDescription) {
        Role role = this.getRole(roleName)
                .orElseThrow(() -> new NotFoundException("Role not found"));
        role.setRoleDescription(roleDescription);
        return this.roleRepository.save(role);
    }
}
