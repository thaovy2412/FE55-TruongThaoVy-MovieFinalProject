import { Movie } from './../../../core/models/movie';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-danh-sach-phim',
  templateUrl: './danh-sach-phim.component.html',
  styleUrls: ['./danh-sach-phim.component.scss'],
})
export class DanhSachPhimComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  movieList: Movie[] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe();
    this.movieService.movieList.subscribe({
      next: (result) => {
        this.movieList = result;
      },
    });
  }
}
