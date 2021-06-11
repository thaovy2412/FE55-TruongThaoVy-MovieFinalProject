import {
  HeThongRapChieu,
  CumRapChieu,
  LichChieuPhim,
} from './../../core/models/movie';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThongTinLichChieuPhim } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-chi-tiet-phim',
  templateUrl: './chi-tiet-phim.component.html',
  styleUrls: ['./chi-tiet-phim.component.scss'],
})
export class ChiTietPhimComponent implements OnInit {
  infoMovieShowTimes: ThongTinLichChieuPhim = null;
  selectedCinemaSystem: string = null;
  heThongRapChieu: HeThongRapChieu | null = null;
  dsNgayChieu: Date[] = [];
  selectedDay: string = '';
  cumRapChieu: CumRapChieu[] = [];
  lichChieuPhim: LichChieuPhim[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    let day1 = new Date();
    let day2 = new Date();
    day2.setDate(new Date().getDate() + 1);
    let day3 = new Date();
    day3.setDate(new Date().getDate() + 2);
    let day4 = new Date();
    day4.setDate(new Date().getDate() + 3);
    let day5 = new Date();
    day5.setDate(new Date().getDate() + 4);
    let day6 = new Date();
    day6.setDate(new Date().getDate() + 5);
    let day7 = new Date();
    day7.setDate(new Date().getDate() + 6);
    this.dsNgayChieu.push(day1, day2, day3, day4, day5, day6, day7);
    let year = day1.getFullYear();
    let month = this.padLeadingZeros(day1.getMonth() + 1, 2);
    let date = this.padLeadingZeros(day1.getDate(), 2);
    this.selectedDay = year + '-' + month + '-' + date;

    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.movieService.getInfoMovieShowTimes(params.maPhim).subscribe({
          next: (result) => {
            this.infoMovieShowTimes = result;
            this.selectedCinemaSystem =
              this.infoMovieShowTimes.heThongRapChieu[0].maHeThongRap;
            this.heThongRapChieu = this.infoMovieShowTimes.heThongRapChieu[0];
            let year = this.dsNgayChieu[0].getFullYear();
            let month = this.padLeadingZeros(
              this.dsNgayChieu[0].getMonth() + 1,
              2
            );
            let date = this.padLeadingZeros(this.dsNgayChieu[0].getDate(), 2);
            this.selectedDay = year + '-' + month + '-' + date;
            this.setCumRapChieu();
          },
        });
      },
    });
  }

  setSelectedCinemaSystem(cinemaSystemId: string) {
    this.cumRapChieu = [];
    this.selectedCinemaSystem = cinemaSystemId;
    for (let i = 0; i < this.infoMovieShowTimes.heThongRapChieu.length; i++) {
      if (
        this.infoMovieShowTimes.heThongRapChieu[i].maHeThongRap ===
        cinemaSystemId
      ) {
        this.heThongRapChieu = this.infoMovieShowTimes.heThongRapChieu[i];
      }
    }
    this.setCumRapChieu();
  }

  layThu(day: any) {
    switch (day) {
      case 0:
        return 'Chủ nhật';
        break;
      case 1:
        return 'Thứ 2';
        break;
      case 2:
        return 'Thứ 3';
        break;
      case 3:
        return 'Thứ 4';
        break;
      case 4:
        return 'Thứ 5';
        break;
      case 5:
        return 'Thứ 6';
        break;
      case 6:
        return 'Thứ 7';
        break;
    }
  }
  padLeadingZeros(num: number, size: number) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
  setSelectedDay(day: Date) {
    this.cumRapChieu = [];
    let year = day.getFullYear();
    let month = this.padLeadingZeros(day.getMonth() + 1, 2);
    let date = this.padLeadingZeros(day.getDate(), 2);
    this.selectedDay = year + '-' + month + '-' + date;
    this.setCumRapChieu();
  }
  setCumRapChieu() {
    for (let i = 0; i < this.heThongRapChieu.cumRapChieu.length; i++) {
      for (
        let j = 0;
        j < this.heThongRapChieu.cumRapChieu[i].lichChieuPhim.length;
        j++
      ) {
        if (
          this.heThongRapChieu.cumRapChieu[i].lichChieuPhim[j].ngayChieuGioChieu
            .toString()
            .slice(0, 10) === this.selectedDay
        ) {
          this.lichChieuPhim.push(
            this.heThongRapChieu.cumRapChieu[i].lichChieuPhim[j]
          );
        }
      }
      if (this.lichChieuPhim.length >= 1) {
        let cumRap: CumRapChieu = {
          hinhAnh: this.heThongRapChieu.cumRapChieu[i].hinhAnh,
          tenCumRap: this.heThongRapChieu.cumRapChieu[i].tenCumRap,
          maCumRap: this.heThongRapChieu.cumRapChieu[i].maCumRap,
          lichChieuPhim: this.lichChieuPhim,
        };
        this.cumRapChieu.push(cumRap);
        this.lichChieuPhim = [];
      }
    }
  }
}
