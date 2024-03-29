import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {CreateHeroData, Hero} from '../interfaces/hero.interface';

import {MessageService} from './message.service';

const httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class HeroService {
  private heroesUrl: string = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  /** GET heroes from the server */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', [])),
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  public getHeroNo404<Data>(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome: string = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`)),
      );
  }

  /** GET hero by id. Will 404 if id not found */
  public getHero(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
    );
  }

  /* GET heroes whose name contains search term */
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

  /** POST: add a new hero to the server */
  public addHero(heroToAdd: CreateHeroData): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, heroToAdd, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero')),
    );
  }

  /** PUT: update the hero on the server */
  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('updateHero')),
    );
  }

  /** DELETE: delete the hero from the server */
  public deleteHero(hero: Hero | number): Observable<Hero> {
    const id: Hero | number = typeof hero === 'number' ? hero : hero.id;
    const url: string = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation: string = 'operation', result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add('HeroService: ' + message);
  }
}
