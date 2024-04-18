import {WerewolvesRoundAction} from "./werewolvesRoundAction.model";

export interface WerewolvesRound {
    roundNum: number;
    playerActions: WerewolvesRoundAction[];
}
