import { Nullable } from "../helpers/types";

export type Image = {
  src: string;
  id: string;
  key: number;
};

export type Tile = {
  isVisible: boolean;
} & Image;

export enum GamePhase {
  BEFORE_START,
  IN_PROGRESS,
  FINISHED,
}

export interface IGameManager {
  generateTiles: (size: number) => void;
  tiles: Nullable<Tile[]>;
  gamePhase: GamePhase;
  compareImages: (tile1: Tile, tile2: Tile) => boolean;
  isFinished: boolean;
}
