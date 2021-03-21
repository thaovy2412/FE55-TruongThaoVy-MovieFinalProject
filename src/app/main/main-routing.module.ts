import { ChiTietPhongVeGuard } from './../core/guards/chi-tiet-phong-ve.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChiTietPhongVeComponent } from './chi-tiet-phong-ve/chi-tiet-phong-ve.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { ThongTinCaNhanComponent } from './thong-tin-ca-nhan/thong-tin-ca-nhan.component';

const routes: Routes = [
  {path:"chitietphongve/:maLichChieu",canActivate:[ChiTietPhongVeGuard], component: ChiTietPhongVeComponent},
  {path:"thongtincanhan", component: ThongTinCaNhanComponent},
  {path:"", loadChildren:()=>MainLayoutModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
