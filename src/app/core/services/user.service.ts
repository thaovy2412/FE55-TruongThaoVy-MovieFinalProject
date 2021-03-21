import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo, UserSignup } from '../models/auth';
import { ThongTinTaiKhoan } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  updateUSerInfo(value: UserSignup): Observable<UserInfo>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return this.http.put<UserInfo>(url,{...value, maNhom:'GP01', maLoaiNguoiDung:'KhachHang'});
  }
  getUserInfo(taiKhoan: string): Observable<ThongTinTaiKhoan>{
    const url =`https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return this.http.post<ThongTinTaiKhoan>(url,{taiKhoan});
  }
}
