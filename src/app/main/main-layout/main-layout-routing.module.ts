import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChiTietCumRapComponent } from '../chi-tiet-cum-rap/chi-tiet-cum-rap.component';
import { ChiTietPhimComponent } from '../chi-tiet-phim/chi-tiet-phim.component';
import { ChiTietPhongVeComponent } from '../chi-tiet-phong-ve/chi-tiet-phong-ve.component';
import { TrangChuModule } from '../trang-chu/trang-chu.module';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {path:"", component:MainLayoutComponent, children:[
    {path:"chitietphim/:maPhim", component: ChiTietPhimComponent},
    {path:"chitietcumrap/:maCumRap", component: ChiTietCumRapComponent},
    {path:"",loadChildren:()=>TrangChuModule},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
