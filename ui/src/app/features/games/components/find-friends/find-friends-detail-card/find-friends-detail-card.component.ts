import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {GameStatus} from "../../../../../core/enums/gameStatus.enum";
import {BadRequestError} from "../../../../../core/models/error/badRequestError.model";
import {GameType} from "../../../../../core/enums/gameType.enum";

@Component({
  selector: 'app-find-friends-detail-card',
  templateUrl: './find-friends-detail-card.component.html',
  styleUrls: ['./find-friends-detail-card.component.css']
})
export class FindFriendsDetailCardComponent implements OnChanges{

  @Input() game: Game | undefined;
  numberOfPokers: number = 0;
  middleScore: number = 0;
  bankerScoreStep: number = 0;
  playerScoreStep: number = 0;

  middleScoreRange: number[] = [];
  bankerScoreStepRange: number[] = [];
  playerScoreStepRange: number[] = [];

  constructor() {
    this.numberOfPokersChange(2);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.game);
    if (this.game != undefined ) {
      if (this.game.gameStatus != GameStatus.PLANING) {
        throw new BadRequestError("Game Status is not Planing");
      } else if (this.game.gameType != GameType.FIND_FRIENDS) {
        throw new BadRequestError("Game Type is not Find Friends");
      }
    }
  }

  numberOfPokersChange(numberOfPokers: number) {
    this.numberOfPokers = numberOfPokers;
    this.middleScore = numberOfPokers * 60;
    this.bankerScoreStep = numberOfPokers * 20;
    this.playerScoreStep = numberOfPokers * 20;

    this.middleScoreRange = [];
    this.bankerScoreStepRange = [];
    this.playerScoreStepRange = [];

    var num: number = Math.floor(this.numberOfPokers / 2);

    for(var i = -2; i <= 2; i++) {
      this.middleScoreRange.push(i * num * 5 + this.middleScore);
      this.bankerScoreStepRange.push(i * num * 10 + this.bankerScoreStep);
      this.playerScoreStepRange.push(i * num * 10 + this.playerScoreStep);
    }

  }
}
