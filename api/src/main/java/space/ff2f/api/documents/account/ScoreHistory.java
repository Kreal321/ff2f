package space.ff2f.api.documents.account;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ScoreHistory implements Serializable {

    private double scoreChange;

    private int reasonCode;

    private String reason;

    private String userId; // who did this


}
