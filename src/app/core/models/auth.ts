export interface SignIn {
  taiKhoan: string;
  matKhau:  string;
}

export interface SignUp {
  taiKhoan:        string;
  matKhau:         string;
  email:           string;
  soDt:            string;
  hoTen:           string;
}

export interface UserSignup {
  taiKhoan: string;
  email: string;
  hoTen: string;
  soDt: string;
  maLoaiNguoiDung: string;
  maNhom: string;
}

export interface UserInfo {
  taiKhoan: string;
  email: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  accessToken: string;
}
