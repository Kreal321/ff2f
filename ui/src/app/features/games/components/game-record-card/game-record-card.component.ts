import {Component, Input} from '@angular/core';
import {Record} from "../../../../core/models/common/record.model";
import {Game} from "../../../../core/models/common/game.model";
import {GameRecords} from "../../../../core/models/common/gameRecords.model";
import {RecordStatus} from "../../../../core/enums/recordStatus.enum";
import {GameService} from "../../../../core/services/game.service";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";
import Swal from "sweetalert2";
import {BadRequestError} from "../../../../core/models/error/badRequestError.model";

@Component({
  selector: 'app-game-record-card',
  templateUrl: './game-record-card.component.html',
  styleUrls: ['./game-record-card.component.css']
})
export class GameRecordCardComponent {
  @Input() gameRecords: GameRecords | undefined;

  protected readonly RecordStatus = RecordStatus;

  constructor(
      private gameService: GameService
  ) { }

  updateRecordStatus(recordId: number, recordStatus: RecordStatus): void {
      this.gameService.updateGameRecord(this.gameRecords!.gameId, recordId, recordStatus).subscribe({
        next: (response: DataResponse) => {

        },
        error: (response) => {
          throw new BadRequestError(response.message);
        }
      });
  }

}
