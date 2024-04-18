import {User} from "./User.model";
import {RecordStatus} from "../../enums/recordStatus.enum";

export interface Record {
    recordId: number;
    user: User;
    gameId: number;
    joinTime: Date;
    recordStatus: RecordStatus;
    admin: boolean;
}
