import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameType} from "../../../../core/enums/gameType.enum";

@Component({
  selector: 'app-game-type-select',
  templateUrl: './game-type-select.component.html',
  styleUrls: ['./game-type-select.component.css']
})
export class GameTypeSelectComponent {

  gameTypes: GameType[] = [GameType.AVALON, GameType.FIND_FRIENDS, GameType.WEREWOLVES, GameType.Others];
  @Input() selectedGameType: GameType | undefined;
  @Output() selectedGameTypeChange: EventEmitter<GameType> = new EventEmitter<GameType>();

  selectGameType(gameType: GameType) {
    this.selectedGameType = gameType;
    this.selectedGameTypeChange.emit(gameType);
  }
}
