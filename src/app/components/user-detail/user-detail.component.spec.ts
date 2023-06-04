import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDetailComponent } from './user-detail.component';
import { GitHubService } from 'src/app/services/git-hub/git-hub.service';
import { Observable, of } from 'rxjs';
import { UserDetail } from 'src/app/types/UserDetail';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let githubService: jasmine.SpyObj<GitHubService>;
  let getUserSpy: jasmine.Spy<() => Observable<UserDetail>>
  let userDetailDummy: UserDetail = {
    avatar_url: '',
    bio: '',
    followers: '',
    html_url: '',
    id: 0,
    login: '',
    public_repos: '',
    url: ''
  }

  beforeEach(() => {
    githubService = jasmine.createSpyObj('GitHubService', ['getUser']);
    getUserSpy = githubService.getUser.and.returnValue(of(userDetailDummy));
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDetailComponent],
      providers: [{ provide: GitHubService, useValue: githubService }]
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
