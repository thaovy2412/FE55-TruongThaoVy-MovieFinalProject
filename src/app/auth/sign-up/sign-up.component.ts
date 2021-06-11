import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formDangKy: FormGroup = new FormGroup({
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
  });
  loading: boolean = false;
  error: string = '';
  @ViewChild('btnShowModal') btnShowModal: ElementRef;
  @ViewChild('btnCloseModal') btnCloseModal: ElementRef;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate() {
    return !this.formDangKy.dirty;
  }

  handleSignup() {
    this.formDangKy.markAllAsTouched();
    if (this.formDangKy.invalid) return;
    this.loading = true;
    this.error = '';
    this.authService.signUp(this.formDangKy.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.btnShowModal.nativeElement.click();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error;
      },
    });
  }

  close() {
    this.btnCloseModal.nativeElement.click();
  }
}
