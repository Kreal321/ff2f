import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RecordStatus} from "../../../../core/enums/recordStatus.enum";

@Component({
  selector: 'app-game-record-status-badge',
  templateUrl: './game-record-status-badge.component.html',
  styleUrls: ['./game-record-status-badge.component.css']
})
export class GameRecordStatusBadgeComponent implements OnChanges{
  @Input() recordStatus: RecordStatus | undefined;

  text: string = '';
  color: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.recordStatus) {
      case RecordStatus.PENDING:
        this.text = 'Pending';
        this.color = 'warning';
        break;
      case RecordStatus.JOINED:
        this.text = 'Joined';
        this.color = 'success';
        break;
      case RecordStatus.LEFT:
        this.text = 'Left';
        this.color = 'secondary';
        break;
      case RecordStatus.KICKED:
        this.text = 'Kicked';
        this.color = 'secondary';
        break;
      case RecordStatus.READY:
        this.text = 'Ready';
        this.color = 'info';
        break;
      default:
            this.text = '';
            this.color = '';
    }
  }
}
