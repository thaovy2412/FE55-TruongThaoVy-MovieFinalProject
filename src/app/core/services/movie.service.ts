import { DanhSachPhongVe, ShowTimesCinemaSystem, ThongTinLichChieuPhim, DatVe, CumRap } from './../models/movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Movie, CinemaSystem } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  movieList = new BehaviorSubject<Movie[]>([]);
  cinemaSystem = new BehaviorSubject<CinemaSystem[]>([]);
  cinemaSystemId = new BehaviorSubject<string>('');

  getMovieList(): Observable<Movie[]>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";
    return this.http.get<Movie[]>(url).pipe(
      tap((result)=>{
        this.movieList.next(result)
      }),
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  getCinemaSystem(): Observable<CinemaSystem[]>{
    const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap";
    return this.http.get<CinemaSystem[]>(url).pipe(
      tap((result)=>{
        this.cinemaSystem.next(result)
      }),
      catchError((err)=>{
        return throwError(err);
      })
    )
  }

  getShowTimesCinemaSystem(cinemaSystemId: string): Observable<ShowTimesCinemaSystem[]>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaSystemId}&maNhom=GP01`;
    // let params = new HttpParams();
    // params.append('maHeThongRap', cinemaSystemId).append('maNhom', 'GP01');
    // return this.http.get<ShowTimesCinemaSystem[]>(url,{params});
    return this.http.get<ShowTimesCinemaSystem[]>(url);
  }

  getInfoMovieShowTimes(maPhim: number): Observable<ThongTinLichChieuPhim>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return this.http.get<ThongTinLichChieuPhim>(url);
  }

  layDanhSachPhongVe(maLichChieu: string): Observable<DanhSachPhongVe>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return this.http.get<DanhSachPhongVe>(url);
  }

  datVe(value: DatVe): Observable<any>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`;
    return this.http.post<any>(url, value);
  }

  layThongTinCumRapTheoHeThong(id: string): Observable<CumRap[]>{
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`;
    return this.http.get<CumRap[]>(url);
  }
}
