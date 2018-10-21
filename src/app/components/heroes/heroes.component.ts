import {Component, OnInit} from '@angular/core';

import {Hero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'atc-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  public add(name: string, strengthString: string = '10'): void {
    name = name.trim();
    const strength: number = Number(strengthString);
    if (!name) {
      return;
    }
    this.heroService.addHero({name, strength} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  public delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
