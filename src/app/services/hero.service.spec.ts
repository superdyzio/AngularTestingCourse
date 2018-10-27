import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';

import {Hero} from '../interfaces/hero.interface';
import {Spied} from '../types/spied.type';

import {MessageService} from './message.service';
import {HeroService} from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let mockMessageService: Spied<MessageService>;

  beforeEach(async(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService},
      ],
    });
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('getHeroes', () => {
    let heroes: Hero[];

    beforeEach(() => {
      heroes = [
        {id: 1, name: 'SuperDude', strength: 50},
        {id: 2, name: 'UltraDude', strength: 80},
        {id: 3, name: 'AwesomeDude', strength: 100},
      ];
    });

    it('should return array of heroes and call messageService.add with success message', (done) => {
      service.getHeroes().subscribe((res: Hero[]) => {
        expect(res).toEqual(heroes);
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add).toHaveBeenCalledWith('HeroService: fetched heroes');
        done();
      });

      const heroesRequest: TestRequest = httpMock.expectOne('api/heroes');
      heroesRequest.flush(heroes);
    });

    it('should call messageService.add with error message when request fails', (done) => {
      service.getHeroes().subscribe(() => {
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add.calls.argsFor(0)[0]).toContain('HeroService: getHeroes failed:');
        done();
      });

      const heroesRequest: TestRequest = httpMock.expectOne('api/heroes');
      heroesRequest.error(new ErrorEvent('SOME_ERROR'));
    });
  });

  describe('getHeroNo404', () => {
    let hero: Hero;

    beforeEach(() => {
      hero = {id: 1, name: 'SuperDude', strength: 50};
    });

    it('should return hero when present and call messageService.add with success message', (done) => {
      const id: number = 1;

      service.getHeroNo404(id).subscribe((res: Hero) => {
        expect(res).toEqual(hero);
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add).toHaveBeenCalledWith(`HeroService: fetched hero id=${id}`);
        done();
      });

      const heroRequest: TestRequest = httpMock.expectOne(`api/heroes/?id=${id}`);
      heroRequest.flush([hero]);
    });

    it('should return undefined when hero not present and call messageService.add with proper message', (done) => {
      const id: number = 2;

      service.getHeroNo404(id).subscribe((res: Hero) => {
        expect(res).toBeUndefined();
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add).toHaveBeenCalledWith(`HeroService: did not find hero id=${id}`);
        done();
      });

      const heroRequest: TestRequest = httpMock.expectOne(`api/heroes/?id=${id}`);
      heroRequest.flush([]);
    });

    it('should call messageService.add with error message when request fails', (done) => {
      const id: number = 1;

      service.getHeroNo404(id).subscribe(() => {
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add.calls.argsFor(0)[0]).toContain(`HeroService: getHero id=${id}`);
        done();
      });

      const heroRequest: TestRequest = httpMock.expectOne(`api/heroes/?id=${id}`);
      heroRequest.error(new ErrorEvent('SOME_ERROR'));
    });
  });

  describe('getHero', () => {
    let hero: Hero;

    beforeEach(() => {
      hero = {id: 1, name: 'SuperDude', strength: 50};
    });

    it('should return hero when present and call messageService.add with success message', (done) => {
      const id: number = 1;

      service.getHero(id).subscribe((res: Hero) => {
        expect(res).toEqual(hero);
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add).toHaveBeenCalledWith(`HeroService: fetched hero id=${id}`);
        done();
      });

      const heroRequest: TestRequest = httpMock.expectOne(`api/heroes/${id}`);
      heroRequest.flush(hero);
    });

    it('should call messageService.add with error message when request fails', (done) => {
      const id: number = 2;

      service.getHero(id).subscribe(() => {
        expect(mockMessageService.add).toHaveBeenCalledTimes(1);
        expect(mockMessageService.add.calls.argsFor(0)[0]).toContain(`HeroService: getHero id=${id}`);
        done();
      });

      const heroRequest: TestRequest = httpMock.expectOne(`api/heroes/${id}`);
      heroRequest.error(new ErrorEvent('SOME_ERROR'));
    });
  });
});
