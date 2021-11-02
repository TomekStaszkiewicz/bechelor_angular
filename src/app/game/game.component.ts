import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { Router } from '@angular/router';
import { Tile } from 'src/managers/types';
import { Nullable } from 'src/helpers/types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  tiles: Tile[] = [];
  selectedTiles: Tile[] = [];
  isClicked = false;
  clickCounter = 0;
  timer = 0;
  intervalId: Nullable<number> = null;
  gameFinished = false;
  constructor(private gameService: GameServiceService, private router: Router) { }

  ngOnInit(): void {
    if(this.gameService.tiles){
      this.tiles = this.gameService.tiles;
    }
  }
  
  clickTile(tile: Tile): void {
    if (tile.isVisible || this.isClicked) {
      return;
    }
    if (!this.clickCounter && !this.selectedTiles.length) {
      this.intervalId = setInterval(() => {
        this.timer += 1;
      }, 1000) as unknown as number;
    };
    this.isClicked = true;
    this.selectedTiles.push(tile);
    if (this.selectedTiles.length === 2) {
      this.gameService.compareImages(
        this.selectedTiles[0],
        this.selectedTiles[1]
      );
      this.clickCounter++;
      setTimeout(() => {
        if (this.gameService.isFinished) {
          if(this.intervalId){
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.gameFinished = true;
          }
        }
        this.selectedTiles = [];
        this.isClicked = false;
      }, 500);
    } else {
      this.isClicked = false;
    }
  }

  restartGame(): void {
    this.router.navigate(["/"]);
  }

  get timeDisplay(): string {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes < 10 ? "0" : ""}${minutes} : ${
        seconds < 10 ? "0" : ""
      }${seconds}`;
  }
}
