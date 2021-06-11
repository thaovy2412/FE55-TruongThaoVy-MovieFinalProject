import { ThongTinTaiKhoan } from './../../core/models/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/core/models/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.scss'],
})
export class ThongTinCaNhanComponent implements OnInit {
  formUpdate: FormGroup = new FormGroup({
    taiKhoan: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    matKhau: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
    ]),
    soDt: new FormControl('', [Validators.required]),
    hoTen: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;
  error: string = '';
  thongTinTaiKhoan: ThongTinTaiKhoan | null = null;
  @ViewChild('btnShowModal') btnShowModal: ElementRef;
  @ViewChild('btnCloseModal') btnCloseModal: ElementRef;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUSer.subscribe({
      next: (result) => {
        this.userService.getUserInfo(result?.taiKhoan).subscribe({
          next: (info) => {
            this.thongTinTaiKhoan = info;
            this.formUpdate.controls['taiKhoan'].setValue(info.taiKhoan);
            this.formUpdate.controls['matKhau'].setValue(info.matKhau);
            this.formUpdate.controls['email'].setValue(info.email);
            this.formUpdate.controls['soDt'].setValue(info.soDT);
            this.formUpdate.controls['hoTen'].setValue(info.hoTen);
          },
        });
      },
    });
  }

  handleUpdate() {
    this.formUpdate.markAllAsTouched();
    if (this.formUpdate.invalid) return;
    this.loading = true;
    this.error = '';
    this.userService.updateUSerInfo(this.formUpdate.value).subscribe({
      next: (result) => {
        let currentUserClone: UserInfo = this.authService.currentUSer.value;
        currentUserClone.taiKhoan = result.taiKhoan;
        currentUserClone.email = result.email;
        currentUserClone.hoTen = result.hoTen;
        currentUserClone.maNhom = result.maNhom;
        currentUserClone.soDT = result.soDT;
        this.authService.currentUSer.next(currentUserClone);
        localStorage.setItem(
          'user',
          JSON.stringify(this.authService.currentUSer.value)
        );
        this.loading = false;
        this.btnShowModal.nativeElement.click();
      },
      error: (err) => {
        this.error = err.error;
        this.loading = false;
      },
    });
  }

  setupDateTime(date: Date) {
    let datetime = new Date(date);
    return (
      datetime.getDate() +
      '/' +
      (datetime.getMonth() + 1) +
      '/' +
      datetime.getFullYear() +
      ' ' +
      datetime.getHours() +
      ':' +
      datetime.getMinutes() +
      ':' +
      datetime.getSeconds()
    );
  }
  close() {
    this.btnCloseModal.nativeElement.click();
  }
}
