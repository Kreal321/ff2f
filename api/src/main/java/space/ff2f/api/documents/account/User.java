package space.ff2f.api.documents.account;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import space.ff2f.api.documents.core.AbstractDocument;
import space.ff2f.api.util.PasswordUtil;
import space.ff2f.api.util.account.RoleName;

import java.util.*;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
public class User extends AbstractDocument {

    @Indexed(unique = true)
    private String username;

    @Indexed(unique = true)
    private String email;

    private String oneTimePassword;

    private String preferredName;

    private boolean isActive;

    private Date lastEmailSentAt;

    private Set<RoleName> roles; // role name enum

    private double score;

    private List<ScoreHistory> scoreHistories;

    private String lastLoginIp;

    private String lastLoginClient;

    private String wechatName;

    private String wechatId;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    public void renewOneTimePassword() {
        this.oneTimePassword = PasswordUtil.getRandomPassword();
    }

    public void addRole(RoleName role) {
        assert role != null;
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }
        this.roles.add(role);
    }

    public boolean removeRole(RoleName role) {
        assert role != null;
        if (this.roles == null) {
            return false;
        }
        return this.roles.remove(role);
    }

    public void addScoreHistory(ScoreHistory scoreHistory) {
        assert scoreHistory != null;
        if (this.scoreHistories == null) {
            this.scoreHistories = new ArrayList<>();
        }
        this.scoreHistories.add(scoreHistory);
    }

}
