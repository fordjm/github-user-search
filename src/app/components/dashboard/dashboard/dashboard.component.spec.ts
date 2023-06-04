import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserSearchComponent } from '../../user-search/user-search/user-search.component';
import { GitHubService } from '../../../services/git-hub/git-hub.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let githubService: jasmine.SpyObj<GitHubService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, UserSearchComponent],
      providers: [{ provide: GitHubService, useValue: githubService }],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
