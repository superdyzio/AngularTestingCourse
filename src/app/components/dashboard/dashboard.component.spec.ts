import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {HeroService} from '../../services/hero.service';
import {Hero} from '../../interfaces/hero.interface';
import {StrengthPipe} from '../../pipes/strength.pipe';
import {Spied} from '../../types/spied.type';

import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let HEROES: Hero[];
  let fourStrongestHeroSortedByStrength: Hero[];
  let mockHeroService: Spied<HeroService>;

  beforeEach(async(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'WonderfulWoman', strength: 25},
      {id: 3, name: 'SuperDude', strength: 15},
      {id: 4, name: 'TurboDude', strength: 25},
      {id: 5, name: 'SpiderWoman', strength: 5},
      {id: 6, name: 'CatWoman', strength: 100},
    ];
    fourStrongestHeroSortedByStrength = [
      {id: 6, name: 'CatWoman', strength: 100},
      {id: 2, name: 'WonderfulWoman', strength: 25},
      {id: 4, name: 'TurboDude', strength: 25},
      {id: 3, name: 'SuperDude', strength: 15},
    ];

    mockHeroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        StrengthPipe,
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should call heroService.getHeroes on component init', () => {
    component.ngOnInit();

    expect(mockHeroService.getHeroes).toHaveBeenCalled();
  });

  it('after component init heroes property should be set to four strongest heroes sorted by strength', () => {
    component.ngOnInit();

    expect(component.heroes).toEqual(fourStrongestHeroSortedByStrength);
  });
});
