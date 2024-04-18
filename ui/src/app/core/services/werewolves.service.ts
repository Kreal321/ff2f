import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse } from "../models/common/dataResponse.model";
import {AvalonCharacterType} from "../enums/avalon/avalonCharacterType.enum";
import {WerewolvesGameMode} from "../models/werewolves/werewolvesGameMode.model";
import {WerewolvesCharacterType} from "../enums/werewolves/werewolvesCharacterType.enum";

@Injectable({
  providedIn: 'root'
})
export class WerewolvesService {

  private readonly hostUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.hostUrl = environment.api;
  }

  getGameModes(): Observable<WerewolvesGameMode[]> {
    return this.http.get<WerewolvesGameMode[]>('./assets/werewolves/werewolvesGameMode.json');
  }

  addGameDetail(gameId: number, description: string, rules: string, numberOfPlayers: number, characters: WerewolvesCharacterType[]): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/games/' + gameId + '/werewolves', {numberOfPlayers, description, rules, characters});
  }

  getGameDetail(gameId: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/games/' + gameId + '/werewolves');
  }

  startGame(gameId: number): Observable<DataResponse> {
    return this.http.patch<DataResponse>(this.hostUrl + '/games/' + gameId + '/werewolves/start', {});
  }

  playerReady(gameId: number, seatNum: number, characterType: WerewolvesCharacterType): Observable<DataResponse> {
    return this.http.patch<DataResponse>(this.hostUrl + '/games/' + gameId + '/werewolves/ready?seatNum=' + seatNum + '&characterType=' + characterType, {});
  }

}
