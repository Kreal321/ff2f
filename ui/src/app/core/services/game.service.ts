import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {DataResponse} from "../models/common/dataResponse.model";
import {GameType} from "../enums/gameType.enum";
import {RecordStatus} from "../enums/recordStatus.enum";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly hostUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.hostUrl = environment.api;
  }

  newGame(gameName: string, gameType: GameType): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/games', {gameName, gameType});
  }

  getGame(gameId: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/games/' + gameId);
  }

  joinGame(gameId: number): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/games/' + gameId + '/join', {});
  }

  getGameRecords(gameId: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.hostUrl + '/games/' + gameId + '/records');
  }

  updateGameRecord(gameId: number, recordId: number, recordStatus: RecordStatus, admin: boolean = false): Observable<DataResponse> {
    return this.http.patch<DataResponse>(this.hostUrl + '/games/' + gameId + '/records/' + recordId + '?recordStatus=' + recordStatus + (admin ? '&admin=true': ''), {});
  }

}
