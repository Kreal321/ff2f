export interface AvalonGameMode {
  name: string;
  numberOfPlayers: number;
  numberOfGoodGuys: number;
  numberOfBadGuys: number;
  quests: number[];
  containsMerlin: boolean;
  containsPercival: boolean;
  containsMordred: boolean;
  containsOberon: boolean;
  containsMorgana: boolean;
  containsAssassin: boolean;
  description: string;
  rules: string;
}
