import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { Router } from '@angular/router';

const availableLevels = {
  Easy: 4,
  Medium: 6,
  Hard: 8,
};

function assertIsCorrectLevel(val: string): asserts val is keyof typeof availableLevels {
  if(!(val in availableLevels)) throw new Error('Trying to use correct level');
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  availableLevels = Object.keys(availableLevels);
  constructor(private gameService: GameServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSelectLevel(level: string): void {
    assertIsCorrectLevel(level);
    
    this.gameService.generateTiles(availableLevels[level]);
    this.router.navigate(['game']);
  }
}
