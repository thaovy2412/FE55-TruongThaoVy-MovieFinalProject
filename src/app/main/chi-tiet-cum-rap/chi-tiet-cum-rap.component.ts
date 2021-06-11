import { MovieSchedule } from './../../core/models/movie';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import {
  Cinema,
  MovieList,
  ShowTimesCinemaSystem,
} from 'src/app/core/models/movie';

@Component({
  selector: 'app-chi-tiet-cum-rap',
  templateUrl: './chi-tiet-cum-rap.component.html',
  styleUrls: ['./chi-tiet-cum-rap.component.scss'],
})
export class ChiTietCumRapComponent implements OnInit {
  maCumRap: string = null;
  lichChieuHeThongRap: ShowTimesCinemaSystem[] = [];
  lichChieuCumRap: Cinema | null = null;
  dsNgayChieu: Date[] = [];
  selectedDay: string = '';
  dsPhim: MovieList[] = [];
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
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
    this.movieService.cinemaSystemId.subscribe({
      next: (id) => {
        this.movieService.getShowTimesCinemaSystem(id).subscribe({
          next: (result) => {
            this.lichChieuHeThongRap = result;
            this.activatedRoute.params.subscribe({
              next: (params) => {
                this.maCumRap = params.maCumRap;
                let index = this.lichChieuHeThongRap[0].lstCumRap.findIndex(
                  (item) => {
                    return item.maCumRap === this.maCumRap;
                  }
                );
                if (index != -1) {
                  this.lichChieuHeThongRap[0].lstCumRap.unshift(
                    this.lichChieuHeThongRap[0].lstCumRap.splice(index, 1)[0]
                  );
                }

                for (
                  let i = 0;
                  i < this.lichChieuHeThongRap[0]?.lstCumRap.length;
                  i++
                ) {
                  if (
                    this.lichChieuHeThongRap[0].lstCumRap[i].maCumRap ===
                    this.maCumRap
                  ) {
                    this.lichChieuCumRap =
                      this.lichChieuHeThongRap[0].lstCumRap[i];
                    this.setLichChieuPhim();
                    return;
                  }
                }
              },
            });
          },
        });
      },
    });
  }
  padLeadingZeros(num: number, size: number) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
  setSelectedDay(day: Date) {
    let year = day.getFullYear();
    let month = this.padLeadingZeros(day.getMonth() + 1, 2);
    let date = this.padLeadingZeros(day.getDate(), 2);
    this.selectedDay = year + '-' + month + '-' + date;
    this.setLichChieuPhim();
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
  setLichChieuPhim() {
    this.dsPhim = [];
    let lichChieu: MovieSchedule[] = [];
    for (let i = 0; i < this.lichChieuCumRap?.danhSachPhim.length; i++) {
      for (
        let j = 0;
        j < this.lichChieuCumRap.danhSachPhim[i].lstLichChieuTheoPhim.length;
        j++
      ) {
        if (
          this.lichChieuCumRap.danhSachPhim[i].lstLichChieuTheoPhim[
            j
          ].ngayChieuGioChieu
            .toString()
            .slice(0, 10) === this.selectedDay
        ) {
          lichChieu.push(
            this.lichChieuCumRap.danhSachPhim[i].lstLichChieuTheoPhim[j]
          );
        }
      }
      if (lichChieu.length >= 1) {
        let phim: MovieList = {
          hinhAnh: this.lichChieuCumRap.danhSachPhim[i].hinhAnh,
          lstLichChieuTheoPhim: lichChieu,
          maPhim: this.lichChieuCumRap.danhSachPhim[i].maPhim,
          tenPhim: this.lichChieuCumRap.danhSachPhim[i].tenPhim,
        };
        this.dsPhim.push(phim);
        lichChieu = [];
      }
    }
  }
}
