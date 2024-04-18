import {Component, Input} from '@angular/core';
import {WerewolvesGameDetail} from "../../../../../core/models/werewolves/werewolvesGameDetail.model";
import {WerewolvesGameStatus} from "../../../../../core/enums/werewolves/werewolvesGameStatus.enum";
@Component({
  selector: 'app-werewolves-player-list-card',
  templateUrl: './werewolves-player-list-card.component.html',
  styleUrls: ['./werewolves-player-list-card.component.css']
})
export class WerewolvesPlayerListCardComponent {

  @Input() werewolvesGameDetail: WerewolvesGameDetail | undefined;

    protected readonly WerewolvesGameStatus = WerewolvesGameStatus;
}
