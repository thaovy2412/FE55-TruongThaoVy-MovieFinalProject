import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrangChuRoutingModule } from './trang-chu-routing.module';
import { TrangChuComponent } from './trang-chu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DanhSachPhimComponent } from './danh-sach-phim/danh-sach-phim.component';
import { LichChieuComponent } from './lich-chieu/lich-chieu.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [TrangChuComponent, CarouselComponent, DanhSachPhimComponent, LichChieuComponent],
  imports: [
    CommonModule,
    TrangChuRoutingModule,
    SlickCarouselModule,
    CarouselModule
  ]
})
export class TrangChuModule { }
