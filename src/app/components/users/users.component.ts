import { Component, OnInit } from '@angular/core';
import { User } from '../../types/User';
import { GitHubService } from '../../services/git-hub/git-hub.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from 'src/app/types/SearchResult';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  totalUsers: number = 0;
  page: number = 1;
  totalPages: number = 0;
  users: User[] = [];
  selectedUser?: User;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // TODO:  Refactor this call into search component and emit an event
    const term = String(this.route.snapshot.paramMap.get('term'));
    this.githubService
      .searchUsers(term, this.page)
      .subscribe((result: SearchResult) => {
        this.totalUsers = result.total_count;
        this.totalPages = Math.ceil(result.total_count / 10);
        this.users = result.items;
      });
  }

  pageChanged($event: number) {
    this.page = $event;
    this.loadData();
  }
}
