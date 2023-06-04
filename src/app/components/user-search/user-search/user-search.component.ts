import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { GitHubService } from '../../../services/git-hub/git-hub.service'
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: [ './user-search.component.css' ]
})
export class UserSearchComponent implements OnInit {
  result$!: Observable<SearchResult>;
  private searchTerms = new Subject<string>();

  constructor(private router: Router, private userService: GitHubService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchList(term: string) {
    console.log(`Enter pressed and term is ${term}`);
    this.router.navigate([`/users/${term}`]);
  }

  ngOnInit(): void {
    this.result$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term))
    );
  }
}
