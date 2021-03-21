export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
}

export interface CinemaSystem {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface MovieSchedule {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
}

export interface MovieList {
  lstLichChieuTheoPhim: MovieSchedule[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
}

export interface Cinema {
  danhSachPhim: MovieList[];
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
}

export interface ShowTimesCinemaSystem {
  lstCumRap: Cinema[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}

export interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
  thoiLuong: number;
}

export interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: null;
}

export interface HeThongRapChieu {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface ThongTinLichChieuPhim {
  heThongRapChieu: HeThongRapChieu[];
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string;
  dangChon: boolean;
  sttTheoHang: string
}

export interface DanhSachPhongVe {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface DanhSachGheTheoHang{
  hang: string;
  danhSachGhe: DanhSachGhe[];
}

export interface DatVe {
  maLichChieu:       number;
  danhSachVe:        DanhSachVe[];
  taiKhoanNguoiDung: string;
}

export interface DanhSachVe {
  maGhe: number;
  giaVe: number;
}

export interface CumRap {
  maCumRap:    string;
  tenCumRap:   string;
  diaChi:      string;
  danhSachRap: DanhSachRap[];
}

export interface DanhSachRap {
  maRap:  number;
  tenRap: string;
}
