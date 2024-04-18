import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse } from "../models/common/dataResponse.model";
import {AvalonGameMode} from "../models/avalon/avalonGameMode.model";
import {GameType} from "../enums/gameType.enum";
import {AvalonCharacterType} from "../enums/avalon/avalonCharacterType.enum";

@Injectable({
  providedIn: 'root'
})
export class AvalonService {

  private readonly hostUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.hostUrl = environment.api;
  }

  getGameModes(): Observable<AvalonGameMode[]> {
    return this.http.get<AvalonGameMode[]>('./assets/avalon/avalonGameMode.json');
  }

  addGameDetail(gameId: number, description: string, rule: string, numberOfPlayers: number, characters: AvalonCharacterType[]): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/games/' + gameId + '/avalon', {numberOfPlayers, description, rule, characters});
  }

  getGameDetail(gameId: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/games/' + gameId + '/avalon');
  }

}
