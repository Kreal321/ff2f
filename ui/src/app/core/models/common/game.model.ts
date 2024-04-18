import { GameType } from "../../enums/gameType.enum";
import { GameStatus } from "../../enums/gameStatus.enum";
import { Record } from "./record.model";
import {GameDetail} from "./gameDetail.model";

export interface Game {
  gameId: number;
  gameType: GameType;
  gameName: string;
  gameStartTime: Date;
  gameStatus: GameStatus;
  records: Record[];
  gameDetail: GameDetail;
}
