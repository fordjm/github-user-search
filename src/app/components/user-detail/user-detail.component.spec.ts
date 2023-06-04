import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDetailComponent } from './user-detail.component';
import { GitHubService } from 'src/app/services/git-hub/git-hub.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/types/User';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let githubService: jasmine.SpyObj<GitHubService>;
  let getUserSpy: jasmine.Spy<() => Observable<User>>
  let userDummy: {}

  beforeEach(() => {
    githubService = jasmine.createSpyObj('GitHubService', ['getUser']);
    getUserSpy = githubService.getUser.and.returnValue(of(userDummy));
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
