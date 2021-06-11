import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() name: string = '';
  @Input() control: AbstractControl | null = null;

  messages: any = {
    taiKhoan: {
      required: 'Tài khoản không được để trống',
      minlength: 'Tài khoản phải có độ dài từ 3 đến 10 ký tự',
      maxlength: 'Tài khoản phải có độ dài từ 3 đến 10 ký tự',
    },
    matKhau: {
      required: 'Mật khẩu không được để trống',
      pattern:
        'Mật khẩu phải có ít nhất 1 số, 1 chữ hoa, 1 chữ thường và từ 8 ký tự trở lên',
    },
    email: {
      required: 'Email không được để trống',
      pattern: 'Email không đúng định dạng',
    },
    soDt: {
      required: 'Số điện thoại không được để trống',
      pattern: 'Số điện thoại không đúng định dạng',
    },
    hoTen: {
      required: 'Họ tên không được để trống',
      pattern: 'Họ tên chỉ chứa duy nhất chữ cái và khoảng cách',
    },
    maPhim: {
      required: 'Mã phim không được để trống',
      pattern: 'Mã phim chỉ bao gồm chữ số, không chứa các ký tự chữ cái',
    },
    tenPhim: {
      required: 'Tên phim không được để trống',
    },
    biDanh: {
      required: 'Bí danh không được để trống',
    },
    trailer: {
      required: 'Trailer không được để trống',
    },
    hinhAnh: {
      required: 'Hình ảnh không được để trống',
    },
    moTa: {
      required: 'Mô tả không được để trống',
    },
    ngayKhoiChieu: {
      required: 'Ngày khởi chiếu không được để trống',
    },
    danhGia: {
      required: 'Đánh giá không được để trống',
      pattern: 'Đánh giá phải có giá trị từ 1 đến 10',
    },
    maRap: {
      required: 'Vui lòng chọn hệ thống rạp, cụm rạp và rạp tương ứng',
    },
    ngayChieuGioChieu: {
      required: 'Vui lòng chọn thời gian chiếu phim',
    },
    giaVe: {
      required: 'Vui lòng nhập giá vé',
      max: 'Vui lòng nhập giá vé trong khoảng từ 75.000VND đến 200.000VND',
      min: 'Vui lòng nhập giá vé trong khoảng từ 75.000VND đến 200.000VND',
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
