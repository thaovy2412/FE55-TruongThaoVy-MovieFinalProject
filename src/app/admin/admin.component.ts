import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faFilm, faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserInfo } from '../core/models/auth';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  faSignOut = faSignOutAlt;
  faFilm = faFilm;
  faUsers = faUsers;
  option:string='quanlyphim';
  currentUSer: UserInfo | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUSer = this.authService.currentUSer.value;
  }

  logout(){
    this.authService.currentUSer.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  setoption(ops:string){
    this.option=ops;
  }
}

