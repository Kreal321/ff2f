import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {WerewolvesGameDetail} from "../../../../../core/models/werewolves/werewolvesGameDetail.model";
import {GameDetail} from "../../../../../core/models/common/gameDetail.model";
import {WerewolvesService} from "../../../../../core/services/werewolves.service";
import {WerewolvesCharacterType} from "../../../../../core/enums/werewolves/werewolvesCharacterType.enum";
import {GameStatus} from "../../../../../core/enums/gameStatus.enum";
import {GameRecords} from "../../../../../core/models/common/gameRecords.model";
import {WerewolvesPlayer} from "../../../../../core/models/werewolves/werewolvesPlayer.model";
import swal from "sweetalert2";
import {BadInputError} from "../../../../../core/models/error/badInputError.model";
import Swal from "sweetalert2";
import {BadRequestError} from "../../../../../core/models/error/badRequestError.model";

@Component({
  selector: 'app-werewolves-character-select-card',
  templateUrl: './werewolves-character-select-card.component.html',
  styleUrls: ['./werewolves-character-select-card.component.css']
})
export class WerewolvesCharacterSelectCardComponent implements OnChanges{

  @Input() werewolvesGameDetail: WerewolvesGameDetail | undefined;
  @Input() gameRecords: GameRecords | undefined;

  seatNum: number[] = [];
  seatNumSelected: number = 0;
  characters: string[] =[];
  characterSelected: string | undefined;
  player: WerewolvesPlayer | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    this.seatNum = Array.from({length: this.werewolvesGameDetail?.numberOfPlayers ?? 0}, (v, k) => k + 1);
    this.characters = [...new Set(this.werewolvesGameDetail?.characters.map(character => this.mapCharacterTypeToCharacterName(character)))];
    this.player = this.werewolvesGameDetail?.playerList.find(record => record.recordId == this.gameRecords?.myRecordId);
    this.seatNumSelected = this.player?.seatNum ?? 0;
    this.characterSelected = this.mapCharacterTypeToCharacterName(this.player?.characterType ?? WerewolvesCharacterType.VILLAGER);
  }

  constructor(
      private wereWolvesService: WerewolvesService,
  ) { }

  seatNumChange(num: number) {
    this.seatNumSelected = num;
  }

  private mapCharacterTypeToCharacterName(characterType: WerewolvesCharacterType): string {
    switch (characterType) {
      case WerewolvesCharacterType.VILLAGER:
        return "村民";
      case WerewolvesCharacterType.SEER:
        return "预言家";
      case WerewolvesCharacterType.WITCH:
        return "女巫";
      case WerewolvesCharacterType.HUNTER:
        return "猎人";
      case WerewolvesCharacterType.KNIGHT:
        return "骑士";
      case WerewolvesCharacterType.IDIOT:
        return "白痴";
      case WerewolvesCharacterType.GUARD:
        return "守卫";
      case WerewolvesCharacterType.WILD_CHILD:
        return "野孩子";
      case WerewolvesCharacterType.BASTARD:
        return "混子";
      case WerewolvesCharacterType.WEREWOLF:
        return "狼人";
      case WerewolvesCharacterType.WEREWOLF_KING:
        return "狼王";
      case WerewolvesCharacterType.WEREWOLF_WHITE_KING:
        return "白狼王";
      case WerewolvesCharacterType.WEREWOLF_BEAUTY:
        return "狼美人";
      default:
        throw new Error("Character Type not found");
    }
  }

  characterChange(character: string) {
    this.characterSelected = character;
  }
  mapCharacterNameToCharacterType(character: string): WerewolvesCharacterType {
    switch (character) {
        case "村民":
            return WerewolvesCharacterType.VILLAGER;
        case "预言家":
            return WerewolvesCharacterType.SEER;
        case "女巫":
            return WerewolvesCharacterType.WITCH;
        case "猎人":
            return WerewolvesCharacterType.HUNTER;
        case "骑士":
            return WerewolvesCharacterType.KNIGHT;
        case "白痴":
            return WerewolvesCharacterType.IDIOT;
        case "守卫":
            return WerewolvesCharacterType.GUARD;
        case "野孩子":
            return WerewolvesCharacterType.WILD_CHILD;
        case "混子":
            return WerewolvesCharacterType.BASTARD;
        case "狼人":
            return WerewolvesCharacterType.WEREWOLF;
        case "狼王":
            return WerewolvesCharacterType.WEREWOLF_KING;
        case "白狼王":
            return WerewolvesCharacterType.WEREWOLF_WHITE_KING;
        case "狼美人":
            return WerewolvesCharacterType.WEREWOLF_BEAUTY;
        default:
            throw new Error("Character Type not found");
    }
  }

    submit() {
      if (this.seatNumSelected == 0) {
          throw new BadInputError("Seat Number not selected");
      }
      if (this.characterSelected == undefined) {
          throw new BadInputError("Character not selected");
      }
      this.wereWolvesService.playerReady(this.gameRecords!.gameId, this.seatNumSelected, this.mapCharacterNameToCharacterType(this.characterSelected)).subscribe({
        next: (data) => {
            Swal.fire({
                title: 'Success',
                text: 'You are ready!',
                icon: 'success',
            })
        },
          error: (error) => {
            throw new BadRequestError(error.message);
        }
      });
    }
}
