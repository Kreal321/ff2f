package space.ff2f.api.dto.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import space.ff2f.api.documents.account.ScoreHistory;
import space.ff2f.api.util.account.RoleName;

import java.util.*;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String preferredName;
    private boolean isActive;
    private Set<RoleName> roles = new HashSet<>(); // role name
    private double score;
    private List<ScoreHistory> scoreHistories = new ArrayList<>();
    private String wechatName;
    private String wechatId;
    private Date createdAt;
    private Date updatedAt;
}
