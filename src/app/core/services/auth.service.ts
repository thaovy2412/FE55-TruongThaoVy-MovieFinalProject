import { UserSignup, SignIn, UserInfo } from './../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUp } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUSer = new BehaviorSubject<UserInfo|null>(null);
  constructor(private http: HttpClient) {}
  signUp(values: SignUp): Observable<UserSignup> {
    const url = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';
    return this.http.post<UserSignup>(url, { ...values, maNhom: 'GP01', maLoaiNguoiDung: 'KhachHang' });
  }

  signIn(values: SignIn): Observable<UserInfo>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap";
    return this.http.post<UserInfo>(url,values);
  }
}
