import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { GitHubService } from '../../../services/git-hub/git-hub.service';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let githubService: jasmine.SpyObj<GitHubService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
      providers: [ { provide: GitHubService, useValue: githubService} ]
    });
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
