import { CountdownModule } from 'ngx-countdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ChiTietPhimComponent } from './chi-tiet-phim/chi-tiet-phim.component';
import { ChiTietPhongVeComponent } from './chi-tiet-phong-ve/chi-tiet-phong-ve.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { ThongTinCaNhanComponent } from './thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChiTietCumRapComponent } from './chi-tiet-cum-rap/chi-tiet-cum-rap.component';


@NgModule({
  declarations: [ChiTietPhimComponent, ChiTietPhongVeComponent, ThongTinCaNhanComponent, ChiTietCumRapComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    CountdownModule
  ]
})
export class MainModule { }
