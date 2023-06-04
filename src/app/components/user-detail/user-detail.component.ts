import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubService } from 'src/app/services/git-hub/git-hub.service';
import { UserDetail } from 'src/app/types/UserDetail';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userDetail?: UserDetail;

  constructor(
    private route: ActivatedRoute,
    private githubService: GitHubService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const login = String(this.route.snapshot.paramMap.get('login'));
    this.githubService.getUser(login).subscribe(user => this.userDetail = user);
  }

  goBack(): void {
    this.location.back();
  }
}
