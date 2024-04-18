import {WerewolvesCharacterType} from "../../enums/werewolves/werewolvesCharacterType.enum";
import {WerewolvesGameStatus} from "../../enums/werewolves/werewolvesGameStatus.enum";
import {WerewolvesPlayer} from "./werewolvesPlayer.model";
import {WerewolvesRound} from "./werewolvesRound.model";

export interface WerewolvesGameDetail {
  numberOfPlayers: number;
  rules: string;
  characters: WerewolvesCharacterType[];
  gameStatus: WerewolvesGameStatus;
  playerList: WerewolvesPlayer[];
  roundList: WerewolvesRound[];
}
