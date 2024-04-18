import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {AvalonGameMode} from "../../../../../core/models/avalon/avalonGameMode.model";
import {AvalonService} from "../../../../../core/services/avalon.service";
import {GameStatus} from "../../../../../core/enums/gameStatus.enum";
import {BadRequestError} from "../../../../../core/models/error/badRequestError.model";
import {GameType} from "../../../../../core/enums/gameType.enum";
import {BadInputError} from "../../../../../core/models/error/badInputError.model";
import {DataResponse} from "../../../../../core/models/common/dataResponse.model";
import Swal from "sweetalert2";
import {AvalonCharacterType} from "../../../../../core/enums/avalon/avalonCharacterType.enum";

@Component({
  selector: 'app-avalon-detail-create-card',
  templateUrl: './avalon-detail-create-card.component.html',
  styleUrls: ['./avalon-detail-create-card.component.css']
})
export class AvalonDetailCreateCardComponent {

  protected readonly AvalonCharacterType = AvalonCharacterType;
  @Input() game: Game | undefined;
  numberOfPlayers: number = 0;
  avalonGameModes: AvalonGameMode[] = [];
  selectedGameMode: AvalonGameMode = {} as AvalonGameMode;

  @Output() hideCreationCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private avalonService: AvalonService
  ) {
    this.avalonService.getGameModes().subscribe(
      data => {
        this.avalonGameModes = data;
      }
    )
  }

  numberOfPlayersChange(num: number): void {
    this.numberOfPlayers = num;
    this.selectedGameMode = this.avalonGameModes[num - 5];
    this.changeRule();
  }


  changeSelect(type: AvalonCharacterType) {
    switch (type) {
      case AvalonCharacterType.MERLIN:
        this.selectedGameMode.containsMerlin = !this.selectedGameMode.containsMerlin;
        break;
      case AvalonCharacterType.PERCIVAL:
        this.selectedGameMode.containsPercival = !this.selectedGameMode.containsPercival;
        break;
      case AvalonCharacterType.MORDRED:
        this.selectedGameMode.containsMordred = !this.selectedGameMode.containsMordred;
        break;
      case AvalonCharacterType.OBERON:
        this.selectedGameMode.containsOberon = !this.selectedGameMode.containsOberon;
        break;
      case AvalonCharacterType.MORGANA:
        this.selectedGameMode.containsMorgana = !this.selectedGameMode.containsMorgana;
        break;
      case AvalonCharacterType.ASSASSIN:
        this.selectedGameMode.containsAssassin = !this.selectedGameMode.containsAssassin;
        break;
    }
    this.changeRule();
  }

  changeRule() {
    let goodGuys = this.selectedGameMode.numberOfGoodGuys;
    let badGuys = this.selectedGameMode.numberOfBadGuys;

    if(this.selectedGameMode.containsMerlin) goodGuys--;
    if(this.selectedGameMode.containsPercival) goodGuys--;
    if(this.selectedGameMode.containsMordred) badGuys--;
    if(this.selectedGameMode.containsOberon) badGuys--;
    if(this.selectedGameMode.containsMorgana) badGuys--;
    if (this.selectedGameMode.containsAssassin) badGuys--;

    this.selectedGameMode.rules = (this.selectedGameMode.containsMerlin ? "Merlin, " : "")
      + (this.selectedGameMode.containsPercival ? "Percival, " : "")
      + goodGuys + " Generic Good Guys "
      + " VS "
      + (this.selectedGameMode.containsMordred ? "Mordred, " : "")
      + (this.selectedGameMode.containsOberon ? "Oberon, " : "")
      + (this.selectedGameMode.containsMorgana ? "Morgana, " : "")
      + (this.selectedGameMode.containsAssassin ? "Assassin, " : "")
      + badGuys + " Generic Bad Guys.";

    if (badGuys < 0) {
      throw new BadInputError("Number of Generic Bad Guys is negative.", "Selection Error");
    }
  }

  submit() {
    let goodGuys = this.selectedGameMode.numberOfGoodGuys;
    let badGuys = this.selectedGameMode.numberOfBadGuys;
    let characters: AvalonCharacterType[] = [];

    if(this.selectedGameMode.containsMerlin) {
      characters.push(AvalonCharacterType.MERLIN);
      goodGuys--;
    }
    if(this.selectedGameMode.containsPercival) {
      characters.push(AvalonCharacterType.PERCIVAL);
      goodGuys--;
    }
    if(this.selectedGameMode.containsMordred) {
      characters.push(AvalonCharacterType.MORDRED);
      badGuys--;
    }
    if(this.selectedGameMode.containsOberon) {
      characters.push(AvalonCharacterType.OBERON);
      badGuys--;
    }
    if(this.selectedGameMode.containsMorgana) {
      characters.push(AvalonCharacterType.MORGANA);
      badGuys--;
    }
    if(this.selectedGameMode.containsAssassin) {
      characters.push(AvalonCharacterType.ASSASSIN);
      badGuys--;
    }

    if (badGuys < 0) {
      throw new BadInputError("Number of Generic Bad Guys is negative.", "Selection Error");
    }
    for (let i = 0; i < goodGuys; i++) {
      characters.push(AvalonCharacterType.GOOD);
    }
    for (let i = 0; i < badGuys; i++) {
      characters.push(AvalonCharacterType.EVIL);
    }

    if (this.numberOfPlayers == 0) {
      throw new BadInputError("You need to select a number of players", "Player number Error");
    }

    this.avalonService.addGameDetail(this.game!.gameId, this.selectedGameMode.description, this.selectedGameMode.rules, this.numberOfPlayers, characters).subscribe({
      next: (response: DataResponse) => {
        Swal.fire({
          title: 'Add Game Detail Successful',
          text: 'Game Detail Added',
          icon: 'success',
        }).then(() => {
          this.hideCreationCard.emit(true);
        })
      },
      error: (response) => {
        throw new BadRequestError(response.message);
      }
    })

  }

}
