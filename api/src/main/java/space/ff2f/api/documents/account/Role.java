package space.ff2f.api.documents.account;

import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import space.ff2f.api.documents.core.AbstractDocument;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Document(collection = "roles")
public class Role extends AbstractDocument {

    @Indexed(unique = true)
    private String roleName;

    private String roleDescription;

}
