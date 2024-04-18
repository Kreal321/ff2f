import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { GamesRoutingModule } from './games-routing.module';

import { PageGamesCreateComponent } from './pages/page-games-create/page-games-create.component';
import { GameCreateCardComponent } from './components/game-create-card/game-create-card.component';
import { GameTypeSelectComponent } from './components/game-type-select/game-type-select.component';

import { MdbRippleModule } from "mdb-angular-ui-kit/ripple";
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { GameInfoCardComponent } from './components/game-info-card/game-info-card.component';
import { PageGameDetailComponent } from './pages/page-game-detail/page-game-detail.component';
import { AvalonDetailCardComponent } from './components/avalon/avalon-detail-card/avalon-detail-card.component';
import { FindFriendsDetailCardComponent } from './components/find-friends/find-friends-detail-card/find-friends-detail-card.component';
import { AvalonDetailCreateCardComponent } from './components/avalon/avalon-detail-create-card/avalon-detail-create-card.component';
import { WerewolvesDetailCardComponent } from './components/werewolves/werewolves-detail-card/werewolves-detail-card.component';
import { WerewolvesDetailCreateCardComponent } from './components/werewolves/werewolves-detail-create-card/werewolves-detail-create-card.component';
import { GameRecordCardComponent } from './components/game-record-card/game-record-card.component';
import { GameRecordStatusBadgeComponent } from './components/game-record-status-badge/game-record-status-badge.component';
import { WerewolvesCharacterSelectCardComponent } from './components/werewolves/werewolves-character-select-card/werewolves-character-select-card.component';
import { WerewolvesPlayerListCardComponent } from './components/werewolves/werewolves-player-list-card/werewolves-player-list-card.component';


@NgModule({
  declarations: [
    PageGamesCreateComponent,
    GameCreateCardComponent,
    GameTypeSelectComponent,
    GameInfoCardComponent,
    PageGameDetailComponent,
    AvalonDetailCardComponent,
    FindFriendsDetailCardComponent,
    AvalonDetailCreateCardComponent,
    WerewolvesDetailCardComponent,
    WerewolvesDetailCreateCardComponent,
    GameRecordCardComponent,
    GameRecordStatusBadgeComponent,
    WerewolvesCharacterSelectCardComponent,
    WerewolvesPlayerListCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    SharedModule,
    MdbRippleModule,
    MdbRangeModule
  ]
})
export class GamesModule { }
