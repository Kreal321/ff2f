import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Game} from "../../../../../core/models/common/game.model";
import {AvalonService} from "../../../../../core/services/avalon.service";
import {GameType} from "../../../../../core/enums/gameType.enum";
import {BadRequestError} from "../../../../../core/models/error/badRequestError.model";
import {GameStatus} from "../../../../../core/enums/gameStatus.enum";
import {DataResponse} from "../../../../../core/models/common/dataResponse.model";
import {ServerError} from "../../../../../core/models/error/serverError.model";
import {WerewolvesService} from "../../../../../core/services/werewolves.service";
import {WerewolvesGameDetail} from "../../../../../core/models/werewolves/werewolvesGameDetail.model";
import {StompService} from "../../../../../core/services/stomp.service";
import {GameRecords} from "../../../../../core/models/common/gameRecords.model";

@Component({
  selector: 'app-werewolves-detail-card',
  templateUrl: './werewolves-detail-card.component.html',
  styleUrls: ['./werewolves-detail-card.component.css']
})
export class WerewolvesDetailCardComponent implements OnInit, OnDestroy{

  @Input() game: Game | undefined;
  @Input() gameRecords: GameRecords | undefined;

  showCreationCard: boolean = false;
  werewolvesGameDetail: WerewolvesGameDetail | undefined;

  constructor(
    private werewolvesService: WerewolvesService,
    private stompService: StompService
  ) {}
  ngOnInit(): void {
    if (this.game != undefined) {
      if (this.game.gameType != GameType.WEREWOLVES) {
        throw new BadRequestError("Game Type is not Werewolves");
      }
      if (this.game.gameStatus == GameStatus.PLANING) {
        this.showCreationCard = true;
      } else {
        this.werewolvesService.getGameDetail(this.game.gameId).subscribe({
          next: (response: DataResponse) => {
            this.game = response.data;
            console.log(this.game);
            this.werewolvesGameDetail = this.game?.gameDetail.detail as WerewolvesGameDetail;
            this.stompService.subscribe('games/' + this.game!.gameId + '/detail', (message : string) => {
              this.updateGameDetail();
            });
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
    this.werewolvesService.getGameDetail(this.game!.gameId).subscribe({
      next: (response: DataResponse) => {
        this.game = response.data;
        console.log(this.game);
      },
      error: (response: DataResponse) => {
        throw new ServerError(response.message);
      }
    });
  }

  private updateGameDetail() {
    this.werewolvesService.getGameDetail(this.game!.gameId).subscribe({
      next: (response: DataResponse) => {
        this.game = response.data;
        console.log(this.game);
        this.werewolvesGameDetail = this.game?.gameDetail.detail as WerewolvesGameDetail;
      },
      error: (response: DataResponse) => {
        throw new ServerError(response.message);
      }
    });
  }

  ngOnDestroy(): void {
  }

  protected readonly GameStatus = GameStatus;
}
