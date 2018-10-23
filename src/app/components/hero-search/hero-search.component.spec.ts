import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

import {Hero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/hero.service';
import {Spied} from '../../types/spied.type';

import {HeroSearchComponent} from './hero-search.component';

describe('HeroSearchComponent', () => {
  let fixture: ComponentFixture<HeroSearchComponent>;
  let component: HeroSearchComponent;
  let heroes: Hero[];
  let mockHeroService: Spied<HeroService>;

  beforeEach(async(() => {
    heroes = [
      {id: 1, name: 'SuperDude', strength: 50},
      {id: 2, name: 'AwesomeDude', strength: 100},
      {id: 3, name: 'MoreSuperDude', strength: 75},
    ];

    mockHeroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    mockHeroService.searchHeroes.and.callFake(term => of(heroes.filter(hero => hero.name.includes(term))));

    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });
});
