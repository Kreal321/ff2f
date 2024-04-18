import { Component } from '@angular/core';
import {GameType} from "../../../../core/enums/gameType.enum";
import {DatePipe} from "@angular/common";
import {GameService} from "../../../../core/services/game.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";
import {BadRequestError} from "../../../../core/models/error/badRequestError.model";
import {BadInputError} from "../../../../core/models/error/badInputError.model";

@Component({
  selector: 'app-game-create-card',
  templateUrl: './game-create-card.component.html',
  styleUrls: ['./game-create-card.component.css']
})
export class GameCreateCardComponent {

  gameName: string = '';
  selectedGameType: GameType | undefined;
  gameStartTime: Date | undefined;

  constructor(
    private gameService: GameService,
    private router: Router,
  ) { }

  randomGameName(): void {
    const now: Date = new Date();
    const datePipe: DatePipe = new DatePipe('en-US');
    this.gameName = datePipe.transform(now, 'MMM d') + ' - ' + (this.selectedGameType ? this.selectedGameType : 'New Game');
  }

  createGame(): void {
    if (!this.gameName) {
      throw new BadInputError("Game Name Required", "Create Game Failed");
    }
    if (!this.selectedGameType) {
      throw new BadInputError("Game Type Required", "Create Game Failed");
    }
    this.gameService.newGame(this.gameName, this.selectedGameType).subscribe({
      next: (response: DataResponse) => {
        Swal.fire({
          title: 'Create Game Successful',
          text: 'Game Created',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/games', response.location]);
        })
      },
      error: (response) => {
        throw new BadRequestError(response.message);
      }
    })
  }

}
