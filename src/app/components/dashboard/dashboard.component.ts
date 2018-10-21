import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/internal/operators';

import {Hero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'atc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(
        map(heroes => this.heroes = heroes.sort(
          (a, b) => a.strength > b.strength ? -1 : a.strength < b.strength ? 1 : 0).slice(0, 4)
        )
      )
      .subscribe(heroes => this.heroes = heroes);
  }
}
