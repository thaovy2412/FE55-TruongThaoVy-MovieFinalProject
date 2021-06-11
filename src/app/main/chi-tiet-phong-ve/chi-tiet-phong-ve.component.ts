import { UserInfo } from './../../core/models/auth';
import { AuthService } from './../../core/services/auth.service';
import {
  DanhSachPhongVe,
  DanhSachGhe,
  DanhSachGheTheoHang,
  DatVe,
  DanhSachVe,
} from './../../core/models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-chi-tiet-phong-ve',
  templateUrl: './chi-tiet-phong-ve.component.html',
  styleUrls: ['./chi-tiet-phong-ve.component.scss'],
})
export class ChiTietPhongVeComponent implements OnInit {
  danhSachVeDangDat: DatVe = {
    maLichChieu: null,
    danhSachVe: [],
    taiKhoanNguoiDung: '',
  };
  danhSachPhongVe: DanhSachPhongVe = null;
  danhSachGhe: DanhSachGhe[] = [];
  danhSachGheTheoHang: DanhSachGheTheoHang[] = [];
  total: number = 0;
  danhSachGheDangChon: string = '';
  userInfo: UserInfo | null = null;
  @ViewChild('cd', { static: false }) cd: CountdownComponent;
  @ViewChild('btn') btn: ElementRef;
  @ViewChild('success') success: ElementRef;
  @ViewChild('btnclosemodalrebook') btnclosemodalrebook: ElementRef;
  @ViewChild('btnclosemodaldatvethanhcong')
  btnclosemodaldatvethanhcong: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.danhSachVeDangDat.maLichChieu = params.maLichChieu;
        this.movieService.layDanhSachPhongVe(params.maLichChieu).subscribe({
          next: (result) => {
            this.danhSachPhongVe = result;
            this.danhSachGhe = result.danhSachGhe;
            this.SapGheTheoHang();
            this.cd.begin();
          },
        });
      },
    });
    this.authService.currentUSer.subscribe({
      next: (result) => {
        this.danhSachVeDangDat.taiKhoanNguoiDung = result?.taiKhoan;
        this.userInfo = result;
      },
    });
  }

  SapGheTheoHang() {
    let danhSachGheTheoHang: DanhSachGhe[] = [];
    let hangNumber = 65;
    let x = 0;
    for (let i = 0; i < 120; i++) {
      let stt = parseInt(this.danhSachGhe[i].stt) - x;
      danhSachGheTheoHang.push({
        ...this.danhSachGhe[i],
        dangChon: false,
        sttTheoHang: stt.toString(),
      });
      if ((i + 1) % 10 === 0) {
        x += 10;
        let hangChar = String.fromCharCode(hangNumber);
        let hangGhe: any = {
          hang: hangChar,
          danhSachGhe: danhSachGheTheoHang,
        };
        this.danhSachGheTheoHang.push(hangGhe);
        hangNumber += 1;
        danhSachGheTheoHang = [];
      }
    }
  }

  chonGhe(hang: string, soGhe: string) {
    for (let i = 0; i < this.danhSachGheTheoHang.length; i++) {
      if (this.danhSachGheTheoHang[i].hang === hang) {
        for (
          let j = 0;
          j < this.danhSachGheTheoHang[i]?.danhSachGhe.length;
          j++
        ) {
          if (this.danhSachGheTheoHang[i].danhSachGhe[j].stt === soGhe) {
            this.danhSachGheTheoHang[i].danhSachGhe[j].dangChon =
              !this.danhSachGheTheoHang[i].danhSachGhe[j].dangChon;
            return;
          }
        }
      }
    }
  }

  tinhTongTien(giaVe: number, dangChon: boolean) {
    if (dangChon) {
      this.total = this.total + giaVe;
    } else {
      this.total = this.total - giaVe;
    }
  }

  hienThiGheDangChon(hang: string, sttGhe: string, dangChon: boolean) {
    let ghe: string = hang + sttGhe + ' ';
    if (dangChon) {
      this.danhSachGheDangChon = this.danhSachGheDangChon + ghe;
    } else {
      let x: string = '';
      let danhSachGheDangChon2 = this.danhSachGheDangChon.split(ghe);
      danhSachGheDangChon2.forEach((ghe) => {
        x = x + ghe;
      });
      this.danhSachGheDangChon = x;
    }
  }

  chonVe(maGhe: number, giaVe: number, dangChon: boolean) {
    let ve: DanhSachVe = {
      maGhe: null,
      giaVe: null,
    };
    ve.maGhe = maGhe;
    ve.giaVe = giaVe;
    if (dangChon) {
      this.danhSachVeDangDat.danhSachVe.push(ve);
    } else {
      for (let i = 0; i < this.danhSachVeDangDat.danhSachVe.length; i++) {
        if (this.danhSachVeDangDat.danhSachVe[i].maGhe === maGhe) {
          this.danhSachVeDangDat.danhSachVe.splice(i, 1);
        }
      }
    }
  }

  datVe() {
    this.movieService.datVe(this.danhSachVeDangDat).subscribe({
      next: (result) => {},
      error: (err) => {
        if (err.error.text) {
          this.success.nativeElement.click();
        } else {
          alert(err.error);
        }
      },
    });
  }

  timeup(e: Event) {
    if (e['action'] == 'done') {
      this.btn.nativeElement.click();
    }
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  closemodalrebook() {
    this.btnclosemodalrebook.nativeElement.click();
  }

  closemodaldatvethanhcong() {
    this.btnclosemodaldatvethanhcong.nativeElement.click();
  }
}
