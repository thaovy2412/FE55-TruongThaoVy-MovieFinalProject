import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void{
    const user = localStorage.getItem('user');
    if(user){
      this.authService.currentUSer.next(JSON.parse(user));
      if(this.authService.currentUSer.getValue().maLoaiNguoiDung==='QuanTri'){
        this.router.navigateByUrl('/admin/quanlyphim');
      }
    }
  }
}
