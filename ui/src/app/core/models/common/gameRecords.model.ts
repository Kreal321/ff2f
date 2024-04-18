import {Record} from "./record.model";

export interface GameRecords {
    gameId: number;
    myRecordId: number;
    admin: boolean;
    records: Record[];
}
