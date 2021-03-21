export interface NguoiDung {
  taiKhoan:        string;
  hoTen:           string;
  email:           string;
  soDt:            string;
  matKhau:         string;
  maLoaiNguoiDung: string;
}

export interface CapNhatNguoiDung {
  taiKhoan:        string;
  matKhau:         string;
  email:           string;
  soDt:            string;
  maNhom:          string;
  maLoaiNguoiDung: string;
  hoTen:           string;
}

export interface Phim {
  maPhim:        number;
  tenPhim:       string;
  biDanh:        string;
  trailer:       string;
  hinhAnh:       string;
  moTa:          string;
  maNhom:        string;
  ngayKhoiChieu: Date;
  danhGia:       number;
}

export interface TaoLichChieu {
  maPhim:            number;
  ngayChieuGioChieu: string;
  maRap:             number;
  giaVe:             number;
}

