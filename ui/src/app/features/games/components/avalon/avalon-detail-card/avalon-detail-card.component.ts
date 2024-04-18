import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {GameStatus} from "../../../../../core/enums/gameStatus.enum";
import {BadRequestError} from "../../../../../core/models/error/badRequestError.model";
import {GameType} from "../../../../../core/enums/gameType.enum";
import {AvalonService} from "../../../../../core/services/avalon.service";
import {DataResponse} from "../../../../../core/models/common/dataResponse.model";
import {ServerError} from "../../../../../core/models/error/serverError.model";
import * as events from "events";

@Component({
  selector: 'app-avalon-detail-card',
  templateUrl: './avalon-detail-card.component.html',
  styleUrls: ['./avalon-detail-card.component.css']
})
export class AvalonDetailCardComponent implements OnChanges{

  @Input() game: Game | undefined;

  showCreationCard: boolean = false;

  constructor(
    private avalonService: AvalonService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.game != undefined) {
      if (this.game.gameType != GameType.AVALON) {
        throw new BadRequestError("Game Type is not Avalon");
      }
      if (this.game.gameStatus == GameStatus.PLANING) {
        this.showCreationCard = true;
      } else {
        this.avalonService.getGameDetail(this.game.gameId).subscribe({
          next: (response: DataResponse) => {
            this.game = response.data;
            console.log(this.game);
          },
          error: (response: DataResponse) => {
            throw new ServerError(response.message);
          }
        });
      }
    }
  }

  setHideCreationCard(hide: boolean): void {
    this.showCreationCard = !hide;
  }

}
