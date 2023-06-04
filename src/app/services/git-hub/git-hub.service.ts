import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  usersUrl: string = 'https://api.github.com/users';
  userSearchUrl: string = 'https://api.github.com/search/users';

  constructor(
    private http: HttpClient,
    private mesageService: MessageService
  ) {}

  getUser(login: string): Observable<any> {
    this.mesageService.add(`GitHubService: fetched user ${login}`);
    const url = `${this.usersUrl}/${login}`;
    return this.http.get<any>(url).pipe(
      tap((_) => this.log(`fetched user login=${login}`)),
      catchError(this.handleError<any>('getUsersData', []))
    );
  }

  getUsersData(): Observable<any> {
    return this.http.get<any>(this.usersUrl).pipe(
      tap((_) => this.log('GitHubService: fetched users')),
      catchError(this.handleError<any>('getUsersData', []))
    );
  }

  /* GET users whose name contains search term from https://angular.io/tutorial/tour-of-heroes */
  searchUsers(term: string, page: number=1): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }

    return this.http.get<any>(`${this.userSearchUrl}?q=${term}&sort=stars&order=desc&page=${page}&per_page=10`).pipe(
      catchError(this.handleError<any>('searchUsers', []))
    );
  }

  log(message: string) {
    this.mesageService.add(message);
  }

  /**
   * From https://angular.io/tutorial/tour-of-heroes
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
