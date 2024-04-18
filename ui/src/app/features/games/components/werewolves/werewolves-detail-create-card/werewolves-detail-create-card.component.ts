import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {WerewolvesGameMode} from "../../../../../core/models/werewolves/werewolvesGameMode.model";
import {WerewolvesCharacterType} from "../../../../../core/enums/werewolves/werewolvesCharacterType.enum";
import {WerewolvesService} from "../../../../../core/services/werewolves.service";
import {BadInputError} from "../../../../../core/models/error/badInputError.model";
import Swal from "sweetalert2";
import {DataResponse} from "../../../../../core/models/common/dataResponse.model";

@Component({
  selector: 'app-werewolves-detail-create-card',
  templateUrl: './werewolves-detail-create-card.component.html',
  styleUrls: ['./werewolves-detail-create-card.component.css']
})
export class WerewolvesDetailCreateCardComponent {
  @Input() game: Game | undefined;
  @Output() hideCreationCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  numberOfPlayers: number = 12;
  numberOfEvils: number = 4;
  numberOfEvilsSelects: number[] = [];
  gameModeNamesOfCurrentPlayers: string[] = [];

  werewolvesGameModes: WerewolvesGameMode[] = [];
  selectedGameMode: WerewolvesGameMode = {} as WerewolvesGameMode;

  protected readonly WerewolvesCharacterType = WerewolvesCharacterType;

  constructor(
    private werewolvesService: WerewolvesService
  ) {
    this.werewolvesService.getGameModes().subscribe(
      data => {
        this.werewolvesGameModes = data;
        this.numberOfPlayersChange(this.numberOfPlayers);
      }
    )
  }

  numberOfPlayersChange(num: number) {
    this.numberOfPlayers = num;
    const gameModesOfCurrentPlayers: WerewolvesGameMode[] = this.werewolvesGameModes.filter(
      gameMode => gameMode.numberOfPlayers === this.numberOfPlayers
    );
    if (gameModesOfCurrentPlayers.length === 0) {
      this.gameModeNamesOfCurrentPlayers = [];
      this.selectedGameMode = this.werewolvesGameModes[0];
    } else {
      this.gameModeNamesOfCurrentPlayers = gameModesOfCurrentPlayers.map(
        gameMode => gameMode.name
      );
      this.selectedGameMode = gameModesOfCurrentPlayers[0];
    }
    this.numberOfEvilsChangeUpdate();
  }

  gameModeChange(name: string) {
    this.selectedGameMode = this.werewolvesGameModes.find(
      gameMode => gameMode.name === name
    ) ?? this.werewolvesGameModes[0];
    this.numberOfEvils = Math.floor(this.selectedGameMode.numberOfPlayers / 3);
    this.numberOfEvilsChangeUpdate();
  }

  numberOfEvilsChangeUpdate() {
    if (this.numberOfEvils > 4) {
      this.numberOfEvilsSelects = [this.selectedGameMode.numberOfVillagers - 2, this.selectedGameMode.numberOfVillagers - 1, this.selectedGameMode.numberOfVillagers, this.selectedGameMode.numberOfVillagers + 1, this.selectedGameMode.numberOfVillagers + 2];
    } else {
      this.numberOfEvilsSelects = [1,2,3,4,5];
    }
    this.updateRule();
  }

  numberOfEvilsChange(num: number): void {
    this.numberOfEvils = num;
    this.numberOfEvilsChangeUpdate();
  }




  changeSelect(characterType: WerewolvesCharacterType) {
    switch (characterType) {
      case WerewolvesCharacterType.SEER:
        this.selectedGameMode.containsSeer = !this.selectedGameMode.containsSeer;
        break;
      case WerewolvesCharacterType.WITCH:
        this.selectedGameMode.containsWitch = !this.selectedGameMode.containsWitch;
        break;
      case WerewolvesCharacterType.HUNTER:
        this.selectedGameMode.containsHunter = !this.selectedGameMode.containsHunter;
        break;
      case WerewolvesCharacterType.KNIGHT:
        this.selectedGameMode.containsKnight = !this.selectedGameMode.containsKnight;
        break;
      case WerewolvesCharacterType.IDIOT:
        this.selectedGameMode.containsIdiot = !this.selectedGameMode.containsIdiot;
        break;
      case WerewolvesCharacterType.GUARD:
        this.selectedGameMode.containsGuard = !this.selectedGameMode.containsGuard;
        break;
      case WerewolvesCharacterType.WILD_CHILD:
        this.selectedGameMode.containsWildChild = !this.selectedGameMode.containsWildChild;
        break;
      case WerewolvesCharacterType.BASTARD:
        this.selectedGameMode.containsBastard = !this.selectedGameMode.containsBastard;
        break;
      case WerewolvesCharacterType.WEREWOLF_KING:
        this.selectedGameMode.containsWerewolfKing = !this.selectedGameMode.containsWerewolfKing;
        break;
      case WerewolvesCharacterType.WEREWOLF_WHITE_KING:
        this.selectedGameMode.containsWerewolfWhiteKing = !this.selectedGameMode.containsWerewolfWhiteKing;
        break;
      case WerewolvesCharacterType.WEREWOLF_BEAUTY:
        this.selectedGameMode.containsWerewolfBeauty = !this.selectedGameMode.containsWerewolfBeauty;
        break;
    }
    this.updateRule();
  }




  updateRule() {
    let villagersNum: number = this.selectedGameMode.numberOfPlayers - this.numberOfEvils;
    let werewolvesNum: number = this.numberOfEvils;

    if (this.selectedGameMode.containsSeer) villagersNum--;
    if (this.selectedGameMode.containsWitch) villagersNum--;
    if (this.selectedGameMode.containsHunter) villagersNum--;
    if (this.selectedGameMode.containsKnight) villagersNum--;
    if (this.selectedGameMode.containsIdiot) villagersNum--;
    if (this.selectedGameMode.containsGuard) villagersNum--;
    if (this.selectedGameMode.containsWildChild) villagersNum--;
    if (this.selectedGameMode.containsBastard) villagersNum--;

    if (this.selectedGameMode.containsWerewolfKing) werewolvesNum--;
    if (this.selectedGameMode.containsWerewolfWhiteKing) werewolvesNum--;
    if (this.selectedGameMode.containsWerewolfBeauty) werewolvesNum--;


    this.selectedGameMode.numberOfVillagers = villagersNum;
    this.selectedGameMode.numberOfWerewolves = werewolvesNum;

    this.selectedGameMode.rules = (this.selectedGameMode.containsSeer ? "预言家, " : "")
      + (this.selectedGameMode.containsWitch ? "女巫, " : "")
      + (this.selectedGameMode.containsHunter ? "猎人, " : "")
      + (this.selectedGameMode.containsKnight ? "骑士, " : "")
      + (this.selectedGameMode.containsIdiot ? "白痴, " : "")
      + (this.selectedGameMode.containsGuard ? "守卫, " : "")
      + (this.selectedGameMode.containsWildChild ? "野孩子, " : "")
      + (this.selectedGameMode.containsBastard ? "混子, " : "")
      + villagersNum + "个村民"
      + " VS "
      + (this.selectedGameMode.containsWerewolfKing ? "狼王, " : "")
      + (this.selectedGameMode.containsWerewolfWhiteKing ? "白狼王, " : "")
      + (this.selectedGameMode.containsWerewolfBeauty ? "狼美人, " : "")
      + werewolvesNum + "个狼人";
  }

  submit() {
    let characters: WerewolvesCharacterType[] = [];
    let villagersNum: number = this.selectedGameMode.numberOfPlayers - this.numberOfEvils;
    let werewolvesNum: number = this.numberOfEvils;

    if (this.selectedGameMode.containsSeer) {
      characters.push(WerewolvesCharacterType.SEER);
      villagersNum--;
    }
    if (this.selectedGameMode.containsWitch) {
      characters.push(WerewolvesCharacterType.WITCH);
      villagersNum--;
    }
    if (this.selectedGameMode.containsHunter) {
      characters.push(WerewolvesCharacterType.HUNTER);
      villagersNum--;
    }
    if (this.selectedGameMode.containsKnight) {
      characters.push(WerewolvesCharacterType.KNIGHT);
      villagersNum--;
    }
    if (this.selectedGameMode.containsIdiot) {
      characters.push(WerewolvesCharacterType.IDIOT);
      villagersNum--;
    }
    if (this.selectedGameMode.containsGuard) {
      characters.push(WerewolvesCharacterType.GUARD);
      villagersNum--;
    }
    if (this.selectedGameMode.containsWildChild) {
      characters.push(WerewolvesCharacterType.WILD_CHILD);
      villagersNum--;
    }
    if (this.selectedGameMode.containsBastard) {
      characters.push(WerewolvesCharacterType.BASTARD);
      villagersNum--;
    }

    if (this.selectedGameMode.containsWerewolfKing) {
      characters.push(WerewolvesCharacterType.WEREWOLF_KING);
      werewolvesNum--;
    }
    if (this.selectedGameMode.containsWerewolfWhiteKing) {
      characters.push(WerewolvesCharacterType.WEREWOLF_WHITE_KING);
      werewolvesNum--;
    }
    if (this.selectedGameMode.containsWerewolfBeauty) {
      characters.push(WerewolvesCharacterType.WEREWOLF_BEAUTY);
      werewolvesNum--;
    }

    if (villagersNum < 0) {
      throw new BadInputError("Number of villagers is negative.");
    }
    if (werewolvesNum < 0) {
      throw new BadInputError("Number of werewolves is negative.");
    }
    for (let i = 0; i < villagersNum; i++) {
      characters.push(WerewolvesCharacterType.VILLAGER);
    }
    for (let i = 0; i < werewolvesNum; i++) {
      characters.push(WerewolvesCharacterType.WEREWOLF);
    }
    if (werewolvesNum != Math.floor(this.selectedGameMode.numberOfPlayers / 3)) {
      Swal.fire({
        title: '狼人数量并不平衡',
        text: '狼人数量应该为' + Math.floor(this.selectedGameMode.numberOfPlayers / 3) + '个，以保证游戏平衡',
        icon: 'warning',
        confirmButtonText: "确认提交",
        confirmButtonColor: "#6e7881",
        showCancelButton: true,
        cancelButtonText: "修改",
        cancelButtonColor: "#6200EE",
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitGameDetail(characters);
        }
      });
    } else {
      this.submitGameDetail(characters);
    }
  }

  private submitGameDetail(characters: WerewolvesCharacterType[]): void {
    this.werewolvesService.addGameDetail(this.game!.gameId, this.selectedGameMode.description, this.selectedGameMode.rules, this.selectedGameMode.numberOfPlayers, characters).subscribe({
      next: (response: DataResponse) => {
        Swal.fire({
          title: 'Add Game Detail Successful',
          text: 'Game Detail Added',
          icon: 'success',
        }).then(() => {
          window.location.reload();
        });
      }
    })
  }

}
