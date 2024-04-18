import {WerewolvesCharacterType} from "../../enums/werewolves/werewolvesCharacterType.enum";

export interface WerewolvesPlayer {
    seatNum: number;
    recordId: number;
    displayName: string;

    characterType: WerewolvesCharacterType;

    assassinated: boolean;
    ready: boolean;
}
