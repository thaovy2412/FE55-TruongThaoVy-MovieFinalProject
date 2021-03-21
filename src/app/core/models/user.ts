export interface ThongTinTaiKhoan {
  taiKhoan:      string;
  matKhau:       string;
  hoTen:         string;
  email:         string;
  soDT:          string;
  maNhom:        string;
  loaiNguoiDung: null;
  thongTinDatVe: ThongTinDatVe[];
}

export interface ThongTinDatVe {
  danhSachGhe:   DanhSachGhe[];
  maVe:          number;
  ngayDat:       Date;
  tenPhim:       string;
  giaVe:         number;
  thoiLuongPhim: number;
}

export interface DanhSachGhe {
  maHeThongRap:  string;
  tenHeThongRap: string;
  maCumRap:      string;
  tenCumRap:     string;
  maRap:         number;
  tenRap:        string;
  maGhe:         number;
  tenGhe:        string;
}
