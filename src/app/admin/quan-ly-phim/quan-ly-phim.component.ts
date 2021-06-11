import { DanhSachRap } from './../../core/models/movie';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Phim } from 'src/app/core/models/admin';
import { AdminService } from 'src/app/core/services/admin.service';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { MovieService } from 'src/app/core/services/movie.service';
import {
  CinemaSystem,
  CumRap,
  ThongTinLichChieuPhim,
} from 'src/app/core/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-phim',
  templateUrl: './quan-ly-phim.component.html',
  styleUrls: ['./quan-ly-phim.component.scss'],
})
export class QuanLyPhimComponent implements OnInit {
  @ViewChild('btnShowAddMovieSuccessModal')
  btnShowAddMovieSuccessModal: ElementRef;
  @ViewChild('btnShowDelMovieSuccessModal')
  btnShowDelMovieSuccessModal: ElementRef;
  @ViewChild('sHtRap') sHtRap: ElementRef;
  @ViewChild('sCumRap') sCumRap: ElementRef;
  error: string = '';
  loading: boolean = false;
  p: any = 1;
  thongTinLichChieuPhim: ThongTinLichChieuPhim | null = null;
  phimChoosing: Phim = null;
  file: File = null;
  faBack = faBackward;
  danhSachPhim: Phim[] | null = null;
  page: any = 1;
  statusAdd: boolean = false;
  formAddMovie: FormGroup = new FormGroup({
    maPhim: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
    tenPhim: new FormControl('', [Validators.required]),
    biDanh: new FormControl('', [Validators.required]),
    trailer: new FormControl('', [Validators.required]),
    hinhAnh: new FormControl('', [Validators.required]),
    moTa: new FormControl('', Validators.required),
    ngayKhoiChieu: new FormControl('', Validators.required),
    danhGia: new FormControl('', [
      Validators.required,
      Validators.pattern('^([1-9]|10)$'),
    ]),
  });
  formEditMovie: FormGroup = new FormGroup({
    maPhim: new FormControl(''),
    tenPhim: new FormControl(''),
    biDanh: new FormControl(''),
    trailer: new FormControl('', [Validators.required]),
    hinhAnh: new FormControl(''),
    moTa: new FormControl(''),
    ngayKhoiChieu: new FormControl('', Validators.required),
    danhGia: new FormControl('', [
      Validators.required,
      Validators.pattern('^([1-9]|10)$'),
    ]),
    maNhom: new FormControl('GP01'),
  });
  formAddShowtimes: FormGroup = new FormGroup({
    maPhim: new FormControl(''),
    ngayChieuGioChieu: new FormControl('', Validators.required),
    maRap: new FormControl('', Validators.required),
    giaVe: new FormControl('', [
      Validators.required,
      Validators.max(200000),
      Validators.min(75000),
    ]),
  });
  heThongRap: CinemaSystem[] | null = null;
  cumRap: CumRap[] | null = null;
  danhSachRap: DanhSachRap[] | null = null;
  constructor(
    private adminService: AdminService,
    private movieService: MovieService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.adminService.layDanhSachPhim().subscribe({
      next: (result) => {
        this.danhSachPhim = result;
      },
    });
    this.movieService.getCinemaSystem().subscribe({
      next: (result) => {
        this.heThongRap = result;
      },
    });
  }
  pageChanged(p: any) {
    this.page = p;
  }
  pageModalChanged(p: any) {
    this.p = p;
  }

  changeStatus() {
    this.statusAdd = !this.statusAdd;
  }

  xoaPhim(maPhim: number) {
    this.loading = true;
    this.adminService.xoaPhim(maPhim).subscribe({
      next: (result) => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.error.text) {
          this.btnShowDelMovieSuccessModal.nativeElement.click();
        } else {
          if (typeof err.error === 'object') {
            this.btnShowDelMovieSuccessModal.nativeElement.click();
          } else {
            alert(err.error);
          }
        }
      },
    });
  }

  handleBack() {
    this.statusAdd = !this.statusAdd;
  }
  handleAdd() {
    this.formAddMovie.markAllAsTouched();
    if (this.formAddMovie.invalid) return;
    this.loading = true;
    this.error = '';
    let date: string = this.getDate(
      this.formAddMovie.controls['ngayKhoiChieu'].value
    );
    this.formAddMovie.controls['ngayKhoiChieu'].setValue(date);
    this.adminService.themPhim(this.formAddMovie.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.adminService
          .uploadHinh(this.file, this.formAddMovie.controls['tenPhim'].value)
          .subscribe({
            next: (result1) => {
              console.log(result1);
            },
            error: (error) => {
              console.log(error.error);
            },
          });
        this.btnShowAddMovieSuccessModal.nativeElement.click();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }
  handleChangeFile(event: any) {
    this.file = event.target.files[0];
    if (this.file.size > 1048576) {
      alert('Dung lượng file vượt quá 1MB!');
      event.srcElement.value = null;
    } else {
      this.formAddMovie.patchValue({
        hinhAnh: this.file.name,
      });
    }
  }
  handleChangeFile2(event: any) {
    this.file = event.target.files[0];
    if (this.file.size > 1048576) {
      alert('Dung lượng file vượt quá 1MB!');
      event.srcElement.value = null;
    } else {
      this.formEditMovie.patchValue({
        hinhAnh: this.file.name,
      });
    }
  }
  handleEdit() {
    this.formEditMovie.markAllAsTouched();
    if (this.formEditMovie.invalid) return;
    this.loading = true;
    this.error = '';
    let date: string = this.getDate(
      this.formEditMovie.controls['ngayKhoiChieu'].value
    );
    this.formEditMovie.controls['ngayKhoiChieu'].setValue(date);
    this.adminService.capNhatPhim(this.formEditMovie.value).subscribe({
      next: (result) => {
        this.loading = false;
        if (this.file) {
          this.adminService
            .uploadHinh(this.file, this.formEditMovie.controls['tenPhim'].value)
            .subscribe({
              next: (result1) => {
                console.log(result1);
              },
              error: (error) => {
                console.log(error.error);
              },
            });
        } else {
          console.log(result);
        }
        alert('Cập nhật phim thành công');
        if (this.file) {
          location.reload();
        } else {
          this.reload();
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }

  getMovieInfo(phim: Phim) {
    this.error = '';
    this.formEditMovie.controls['maPhim'].setValue(phim.maPhim);
    this.formEditMovie.controls['ngayKhoiChieu'].setValue(
      formatDate(phim.ngayKhoiChieu, 'yyyy-MM-dd', 'en')
    );
    this.formEditMovie.controls['tenPhim'].setValue(phim.tenPhim);
    this.formEditMovie.controls['danhGia'].setValue(phim.danhGia);
    this.formEditMovie.controls['trailer'].setValue(phim.trailer);
    this.formEditMovie.controls['hinhAnh'].setValue(phim.hinhAnh);
    this.formEditMovie.controls['biDanh'].setValue(phim.biDanh);
    this.formEditMovie.controls['moTa'].setValue(phim.moTa);
  }

  getMovie(phim: Phim) {
    this.error = '';
    this.phimChoosing = phim;
    this.movieService.getInfoMovieShowTimes(phim.maPhim).subscribe({
      next: (result) => {
        this.thongTinLichChieuPhim = result;
        this.formAddShowtimes.controls['maPhim'].setValue(
          this.thongTinLichChieuPhim.maPhim
        );
      },
    });
  }

  selectCinemaSystem(event: any) {
    this.movieService
      .layThongTinCumRapTheoHeThong(event.target.value)
      .subscribe({
        next: (result) => {
          this.cumRap = result;
        },
      });
  }
  selectedCinema(event: any) {
    for (let i = 0; i < this.cumRap.length; i++) {
      if (this.cumRap[i].maCumRap === event.target.value) {
        this.danhSachRap = this.cumRap[i].danhSachRap;
        return;
      }
    }
  }
  handleAddShowTimes() {
    this.formAddShowtimes.markAllAsTouched();
    if (this.formAddShowtimes.invalid) return;
    this.loading = true;
    this.error = '';
    let datetime = new Date(
      this.formAddShowtimes.controls['ngayChieuGioChieu'].value
    );
    let date = this.padLeadingZeros(datetime.getDate(), 2);
    let month = this.padLeadingZeros(datetime.getMonth() + 1, 2);
    let year = this.padLeadingZeros(datetime.getFullYear(), 2);
    let hour = this.padLeadingZeros(datetime.getHours(), 2);
    let minute = this.padLeadingZeros(datetime.getMinutes(), 2);
    let second = this.padLeadingZeros(datetime.getSeconds(), 2);
    this.formAddShowtimes.controls['ngayChieuGioChieu'].setValue(
      date + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second
    );
    this.adminService.taoLichChieu(this.formAddShowtimes.value).subscribe({
      next: (result) => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.error.text) {
          alert(err.error.text);
          this.sHtRap.nativeElement.value = '';
          this.sCumRap.nativeElement.value = '';
          this.cumRap = [];
          this.danhSachRap = null;
          this.formAddShowtimes.reset();
          this.formAddShowtimes.controls['maRap'].setValue('');
          this.formAddShowtimes.controls['maPhim'].setValue(
            this.thongTinLichChieuPhim.maPhim
          );
          this.movieService
            .getInfoMovieShowTimes(
              this.formAddShowtimes.controls['maPhim'].value
            )
            .subscribe({
              next: (showtimes) => {
                this.thongTinLichChieuPhim = showtimes;
              },
            });
        } else {
          this.error = err.error;
        }
      },
    });
  }

  padLeadingZeros(num: number, size: number) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
  getDate(datetime: Date) {
    let date = new Date(datetime);
    return (
      this.padLeadingZeros(date.getDate(), 2) +
      '/' +
      this.padLeadingZeros(date.getMonth() + 1, 2) +
      '/' +
      this.padLeadingZeros(date.getFullYear(), 2)
    );
  }
  getDateTime(date: Date) {
    let datetime = new Date(date);
    return (
      this.padLeadingZeros(datetime.getDate(), 2) +
      '/' +
      this.padLeadingZeros(datetime.getMonth() + 1, 2) +
      '/' +
      this.padLeadingZeros(datetime.getFullYear(), 2) +
      ' ' +
      this.padLeadingZeros(datetime.getHours(), 2) +
      ':' +
      this.padLeadingZeros(datetime.getMinutes(), 2) +
      ':' +
      this.padLeadingZeros(datetime.getSeconds(), 2)
    );
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  refesh() {
    this.sHtRap.nativeElement.value = '';
    this.sCumRap.nativeElement.value = '';
    this.danhSachRap = null;
    this.formAddShowtimes.reset();
    this.formAddShowtimes.controls['maRap'].setValue('');
    this.formAddShowtimes.controls['maPhim'].setValue(
      this.thongTinLichChieuPhim.maPhim
    );
  }
}
