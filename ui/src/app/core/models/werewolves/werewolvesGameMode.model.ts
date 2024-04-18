export interface WerewolvesGameMode {
  name: string;
  numberOfPlayers: number;
  description: string;
  rules: string;

  numberOfVillagers: number;
  numberOfWerewolves: number;

  containsSeer: boolean;
  containsWitch: boolean;
  containsHunter: boolean;
  containsKnight: boolean;
  containsIdiot: boolean;
  containsGuard: boolean;
  containsWildChild: boolean;
  containsBastard: boolean;
  containsWerewolfKing: boolean;
  containsWerewolfWhiteKing: boolean;
  containsWerewolfBeauty: boolean;
}
