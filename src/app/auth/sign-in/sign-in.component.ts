import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/core/models/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formDangNhap: FormGroup = new FormGroup({
    taiKhoan: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    matKhau: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleSignIn() {
    this.formDangNhap.markAllAsTouched();
    if (this.formDangNhap.invalid) return;
    this.loading = true;
    this.error = '';

    this.authService.signIn(this.formDangNhap.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.authService.currentUSer.next(result);
        localStorage.setItem('user', JSON.stringify(result));
        const { maLoaiNguoiDung } = result;
        const url = (window as any).PATH;
        if (url) {
          this.router.navigateByUrl(url);
          (window as any).PATH = null;
        } else if (maLoaiNguoiDung === 'QuanTri') {
          this.router.navigateByUrl('/admin/quanlyphim');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }
}
