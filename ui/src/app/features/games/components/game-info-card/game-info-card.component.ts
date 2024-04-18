import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game} from "../../../../core/models/common/game.model";
import {Record} from "../../../../core/models/common/record.model";
import {WerewolvesGameMode} from "../../../../core/models/werewolves/werewolvesGameMode.model";
import {GameStatus} from "../../../../core/enums/gameStatus.enum";
import {GameRecords} from "../../../../core/models/common/gameRecords.model";
import {GameService} from "../../../../core/services/game.service";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";
import {BadRequestError} from "../../../../core/models/error/badRequestError.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {RecordStatus} from "../../../../core/enums/recordStatus.enum";
import {GameType} from "../../../../core/enums/gameType.enum";
import {WerewolvesService} from "../../../../core/services/werewolves.service";
import {BadInputError} from "../../../../core/models/error/badInputError.model";

@Component({
  selector: 'app-game-info-card',
  templateUrl: './game-info-card.component.html',
  styleUrls: ['./game-info-card.component.css']
})
export class GameInfoCardComponent {

  @Input() game: Game | undefined;
  @Input() gameRecords: GameRecords | undefined;

  protected readonly GameStatus = GameStatus;

  constructor(
      private gameService: GameService,
      private wereWolvesService: WerewolvesService,
      private router: Router,
  ) {
  }

  joinGame() {
    this.gameService.joinGame(this.game!.gameId).subscribe({
      next: (response: DataResponse) => {
        Swal.fire({
          title: 'Join Game Successful',
          text: 'You have joined the game',
          icon: 'success',
        })
      },
      error: (response: DataResponse) => {
        throw new BadInputError(response.message);
      }
    });
  }

  startGame() {
    switch (this.game!.gameType) {
      case GameType.WEREWOLVES:
        this.wereWolvesService.startGame(this.game!.gameId).subscribe({
          next: (response: DataResponse) => {
            Swal.fire({
              title: 'Game Started',
              text: 'You have started the game',
              icon: 'success',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (response: DataResponse) => {
              throw new BadInputError(response.message);
          }
        });

        break;
      default:
        Swal.fire({
          title: 'Game Type Not Supported',
          text: 'It might under development or not supported yet.',
          icon: 'error',
        })
    }
  }
}
