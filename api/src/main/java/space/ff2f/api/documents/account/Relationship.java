package space.ff2f.api.documents.account;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Builder
@Document(collection = "relationships")
public class Relationship implements Serializable {

    @Id
    private String id;

    private String userId;

    private String targetUserId;

    private boolean meetInPerson;

    private double score;
}
