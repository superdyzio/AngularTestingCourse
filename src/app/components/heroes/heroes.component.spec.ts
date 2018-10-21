import {of} from 'rxjs';

import {Hero} from '../../interfaces/hero.interface';
import {HeroService} from '../../services/hero.service';

import {HeroesComponent} from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService: any; // tslint:disable-line:no-any

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'WonderfulWoman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj('HeroService', ['addHero', 'deleteHero', 'getHeroes']);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    mockHeroService.deleteHero.and.returnValue(of(true));

    component = new HeroesComponent(mockHeroService);
  });

  describe('ngOnInit', () => {
    it('should call getHeroes method', () => {
      const spy: jasmine.Spy = spyOn(component, 'getHeroes');

      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHeroes', () => {
    it('should call heroService.getHeroes', () => {
      component.getHeroes();

      expect(mockHeroService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should set heroes property to value returned by getHeroes', () => {
      component.getHeroes();

      expect(component.heroes).toEqual(HEROES);
    });
  });

  describe('add', () => {
    const defaultStrength: number = 10;
    const newHeroWithDefaultStrengthName: string = 'Default Dude';
    const expectedAddedHeroWithDefaultStrength: Hero = {id: 4, name: newHeroWithDefaultStrengthName, strength: defaultStrength};

    const newHeroStrength: number = 999;
    const newHeroWithProvidedStrengthName: string = 'New Strongest Dude';
    const expectedAddedHeroWithProvidedStrength: Hero = {id: 4, name: newHeroWithProvidedStrengthName, strength: newHeroStrength};

    beforeEach(() => {
      component.heroes = HEROES;
    });

    it('should call heroService.addHero using default strength value when not provided', () => {
      mockHeroService.addHero.and.returnValue(of(expectedAddedHeroWithDefaultStrength));

      component.add(newHeroWithDefaultStrengthName);

      expect(mockHeroService.addHero).toHaveBeenCalledWith({name: newHeroWithDefaultStrengthName, strength: defaultStrength});
      expect(mockHeroService.addHero).toHaveBeenCalledTimes(1);
    });

    it('should call heroService.addHero using provided strength', () => {
      mockHeroService.addHero.and.returnValue(of(expectedAddedHeroWithProvidedStrength));

      component.add(newHeroWithProvidedStrengthName, `${newHeroStrength}`);

      expect(mockHeroService.addHero).toHaveBeenCalledWith({name: newHeroWithProvidedStrengthName, strength: newHeroStrength});
      expect(mockHeroService.addHero).toHaveBeenCalledTimes(1);
    });

    it('should add hero to heroes array', () => {
      mockHeroService.addHero.and.returnValue(of(expectedAddedHeroWithDefaultStrength));
      const startingHeroesCount: number = HEROES.length;

      component.add(newHeroWithDefaultStrengthName);

      expect(component.heroes.length).toEqual(startingHeroesCount + 1);
    });

    it('should not call heroService.addHero when name is not specified', () => {
      const startingHeroesCount: number = HEROES.length;

      component.add('');

      expect(mockHeroService.addHero).not.toHaveBeenCalled();
      expect(component.heroes.length).toEqual(startingHeroesCount);
    });
  });

  describe('deleteHero', () => {
    it('should remove hero from list', () => {
      const heroToRemove: Hero = HEROES[1];
      component.heroes = HEROES;

      component.delete(heroToRemove);

      expect(component.heroes).toEqual(HEROES.filter(hero => hero !== heroToRemove));
    });

    it('should call heroService.deleteHero with given hero', () => {
      const heroToRemove: Hero = HEROES[1];
      component.heroes = HEROES;

      component.delete(heroToRemove);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroToRemove);
      expect(mockHeroService.deleteHero).toHaveBeenCalledTimes(1);
    });
  });
});
