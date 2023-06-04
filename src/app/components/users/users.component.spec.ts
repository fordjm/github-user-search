import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersComponent } from './users.component';
import { GitHubService } from '../../services/git-hub/git-hub.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of } from 'rxjs';
import { SearchResult } from 'src/app/types/SearchResult';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let githubService: jasmine.SpyObj<GitHubService>;
  let searchUsersSpy: jasmine.Spy<() => Observable<SearchResult>>;
  let searchResultDummy: SearchResult = {
    total_count: 0,
    incomplete_results: false,
    items: []
  };

  beforeEach(() => {
    githubService = jasmine.createSpyObj('GitHubService', ['searchUsers']);
    searchUsersSpy = githubService.searchUsers.and.returnValue(
      of(searchResultDummy)
    );
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxPaginationModule],
      declarations: [UsersComponent],
      providers: [{ provide: GitHubService, useValue: githubService }],
    });
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
