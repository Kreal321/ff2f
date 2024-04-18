import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../../core/services/game.service";
import {Game} from "../../../../core/models/common/game.model";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";
import {BadRequestError} from "../../../../core/models/error/badRequestError.model";
import {GameType} from "../../../../core/enums/gameType.enum";
import {GameRecords} from "../../../../core/models/common/gameRecords.model";
import {StompService} from "../../../../core/services/stomp.service";
import {GameStatus} from "../../../../core/enums/gameStatus.enum";

@Component({
  selector: 'app-page-game-detail',
  templateUrl: './page-game-detail.component.html',
  styleUrls: ['./page-game-detail.component.css']
})
export class PageGameDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private stompService: StompService
  ) { }

  game: Game | undefined;
  gameRecords: GameRecords | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameService.getGame(params["id"]).subscribe({
        next: (response: DataResponse) => {
          this.game = response.data;
          this.gameService.getGameRecords(this.game!.gameId).subscribe({
            next: (response: DataResponse) => {
              this.gameRecords = response.data;
              if (this.game?.gameStatus == GameStatus.DETAIL_CREATED) {
                this.stompService.subscribe('games/' + this.game!.gameId + '/records', (message : string) => {
                  this.updateRecords();
                });
              }
              if (!this.gameRecords!.admin && this.game!.gameStatus == GameStatus.PLANING) {
                throw new BadRequestError("Game is planing, please wait for admin to start the game");
              }
            },
            error: (response: DataResponse) => {
              throw new BadRequestError(response.message);
            }
          });
          this.stompService.subscribe('games/' + this.game!.gameId, (message : string) => {
            this.updateGame();
          });
        },
        error: (response: DataResponse) => {
          throw new BadRequestError(response.message);
        }
      });
    });
  }

  private updateGame(): void {
    this.gameService.getGame(this.game!.gameId).subscribe({
      next: (response: DataResponse) => {
        this.game = response.data;
      },
      error: (response: DataResponse) => {
        throw new BadRequestError(response.message);
      }
    });
  }

  private updateRecords(): void {
    this.gameService.getGameRecords(this.game!.gameId).subscribe({
      next: (response: DataResponse) => {
        this.gameRecords = response.data;
      },
      error: (response: DataResponse) => {
        throw new BadRequestError(response.message);
      }
    });
  }

  protected readonly GameType = GameType;

  ngOnDestroy(): void {
  }

    protected readonly GameStatus = GameStatus;
}
