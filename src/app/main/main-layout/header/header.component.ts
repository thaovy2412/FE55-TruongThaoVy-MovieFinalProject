import { UserInfo } from './../../../core/models/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faSignout = faSignOutAlt;
  faUser=faUser;
  currentUSer : UserInfo = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUSer.subscribe({
      next: (result) => {
        this.currentUSer = result;
      }
    })
  }

  logout(){
    this.authService.currentUSer.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

}
