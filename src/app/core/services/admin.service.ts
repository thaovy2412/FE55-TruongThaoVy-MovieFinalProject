import { CapNhatNguoiDung, NguoiDung, Phim, TaoLichChieu } from './../models/admin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  layDanhSachNguoiDung(): Observable<NguoiDung[]>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01";
    return this.http.get<NguoiDung[]>(url);
  }

  timKiemNguoiDung(key:string): Observable<NguoiDung[]>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${key}`;
    return this.http.get<NguoiDung[]>(url);
  }

  xoaNguoiDung(taiKhoan: string):Observable<any>{
    const url =`https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    return this.http.delete<any>(url);
  }

  capNhatNguoiDung(user: CapNhatNguoiDung):Observable<any>{
    const url = 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    return this.http.put<any>(url, user);
  }

  themNguoiDung(user: NguoiDung):Observable<any>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung`;
    return this.http.post<any>(url,{...user, maNhom:'GP01'})
  }

  layDanhSachPhim():Observable<Phim[]>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";
    return this.http.get<Phim[]>(url);
  }

  xoaPhim(maPhim: number):Observable<any>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    return this.http.delete<any>(url);
  }

  themPhim(phim:Phim): Observable<any>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim";
    return this.http.post<any>(url,{...phim,maNhom:'GP01'});
  }

  uploadHinh(file: File, tenPhim: string): Observable<any>{
    const url ="https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim";
    let frm = new FormData;
    frm.append('File', file, file.name);
    frm.append('tenphim', tenPhim);
    frm.append('manhom','GP01');
    return this.http.post<any>(url,frm);
  }

  capNhatPhim(phim:Phim):Observable<any>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim";
    return this.http.post<any>(url,phim);
  }

  taoLichChieu(lichChieu: TaoLichChieu): Observable<any> {
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu";
    return this.http.post<any>(url,lichChieu);
  }
}
