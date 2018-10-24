import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Location} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {HeroService} from '../../services/hero.service';
import {Hero} from '../../interfaces/hero.interface';
import {Spied} from '../../types/spied.type';

import {HeroDetailComponent} from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let component: HeroDetailComponent;
  let hero: Hero;
  let thirdHero: Hero;
  let mockHeroService: Spied<HeroService>;
  let mockActivatedRoute: object;
  let mockLocation: Spied<Location>;

  beforeEach(async(() => {
    hero = {id: 1, name: 'SuperDude', strength: 50};
    thirdHero = {id: 3, name: 'SpiderDude', strength: 100};

    mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    mockHeroService.getHero.and.callFake((id: number) => id === 3 ? of(thirdHero) : of(hero));
    mockHeroService.updateHero.and.returnValue(of(null));
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot: {paramMap: {get: () => '3'}},
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    component.hero = hero;
    expect(component.hero).toEqual(hero);
  });

  describe('ngOnInit', () => {
    it('should call getHero', () => {
      const getHeroSpy: jasmine.Spy = spyOn(component, 'getHero');

      component.ngOnInit();

      expect(getHeroSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHero', () => {
    it('should call heroService.getHero with hero id and then set hero property based on response', () => {
      component.getHero();

      expect(mockHeroService.getHero).toHaveBeenCalledTimes(1);
      expect(mockHeroService.getHero).toHaveBeenCalledWith(3);
      expect(component.hero).toEqual(thirdHero);
    });
  });

  describe('goBack', () => {
    it('should call location.back', () => {
      component.goBack();

      expect(mockLocation.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('should call heroService.updateHero and then call goBack', () => {
      const goBackSpy: jasmine.Spy = spyOn(component, 'goBack');
      fixture.detectChanges();

      component.save();

      expect(mockHeroService.updateHero).toHaveBeenCalledWith(thirdHero);
      expect(goBackSpy).toHaveBeenCalledTimes(1);
    });
  });
});
