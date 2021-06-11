import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NguoiDung } from './../../core/models/admin';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  faSearch,
  faBackward,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/core/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.scss'],
})
export class QuanLyNguoiDungComponent implements OnInit {
  @ViewChild('btnShowAddUserSuccessModal')
  btnShowAddUserSuccessModal: ElementRef;
  @ViewChild('btnCloseAddUserSuccessModal')
  btnCloseAddUserSuccessModal: ElementRef;
  @ViewChild('btnShowDelUserSuccessModal')
  btnShowDelUserSuccessModal: ElementRef;
  @ViewChild('btnCloseDelUserSuccessModal')
  btnCloseDelUserSuccessModal: ElementRef;
  @ViewChild('btnShowUpdateUserSuccessModal')
  btnShowUpdateUserSuccessModal: ElementRef;
  @ViewChild('btnCloseUpdateUserSuccessModal')
  btnCloseUpdateUserSuccessModal: ElementRef;
  loading: boolean = false;
  error: string = '';
  faSearch = faSearch;
  faBack = faBackward;
  faSave = faSave;
  page: any = 1;
  danhSachNguoiDung: NguoiDung[] | null = null;
  addStatus: boolean = false;
  userInfoAdd: NguoiDung = null;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  formEdit: FormGroup = new FormGroup({
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
    soDt: new FormControl('', [
      Validators.required,
      Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    ]),
    hoTen: new FormControl('', [Validators.required]),
    maNhom: new FormControl(''),
    maLoaiNguoiDung: new FormControl(''),
  });
  formAdd: FormGroup = new FormGroup({
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
    soDt: new FormControl('', [
      Validators.required,
      Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    ]),
    hoTen: new FormControl('', [Validators.required]),
    maLoaiNguoiDung: new FormControl('KhachHang'),
  });
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.layDanhSachNguoiDung().subscribe({
      next: (result) => {
        this.danhSachNguoiDung = result;
      },
    });
    this.onChange();
  }

  pageChanged(p: any) {
    this.page = p;
  }

  handleSearch() {
    this.adminService
      .timKiemNguoiDung(this.searchForm.get('name').value)
      .subscribe({
        next: (result) => {
          this.page = 1;
          this.danhSachNguoiDung = result;
        },
      });
  }

  onChange() {
    this.searchForm.valueChanges.subscribe((val) => {
      this.page = 1;
      if (val.name === '') {
        this.adminService.layDanhSachNguoiDung().subscribe({
          next: (result) => {
            this.danhSachNguoiDung = result;
          },
        });
      } else {
        this.adminService.timKiemNguoiDung(val.name).subscribe({
          next: (result) => {
            this.danhSachNguoiDung = result;
          },
        });
      }
    });
  }

  deleteUser(taiKhoan: string) {
    this.adminService.xoaNguoiDung(taiKhoan).subscribe({
      error: (err) => {
        if (err.error.text) {
          this.btnShowDelUserSuccessModal.nativeElement.click();
        } else {
          alert(err.error);
        }
      },
    });
  }

  getUserInfoTable(user: NguoiDung) {
    this.error = '';
    this.formEdit.controls['taiKhoan'].setValue(user.taiKhoan);
    this.formEdit.controls['matKhau'].setValue(user.matKhau);
    this.formEdit.controls['email'].setValue(user.email);
    this.formEdit.controls['soDt'].setValue(user.soDt);
    this.formEdit.controls['hoTen'].setValue(user.hoTen);
    this.formEdit.controls['maNhom'].setValue('GP01');
    this.formEdit.controls['maLoaiNguoiDung'].setValue(user.maLoaiNguoiDung);
  }

  handleEdit() {
    this.formEdit.markAllAsTouched();
    if (this.formEdit.invalid) return;
    this.loading = true;
    this.error = '';
    this.adminService.capNhatNguoiDung(this.formEdit.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.btnShowUpdateUserSuccessModal.nativeElement.click();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }

  changeAddStatus() {
    this.addStatus = !this.addStatus;
  }

  handleBack() {
    this.addStatus = !this.addStatus;
  }

  handleAdd() {
    this.formAdd.markAllAsTouched();
    if (this.formAdd.invalid) return;
    this.loading = true;
    this.error = '';
    this.adminService.themNguoiDung(this.formAdd.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.btnShowAddUserSuccessModal.nativeElement.click();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
