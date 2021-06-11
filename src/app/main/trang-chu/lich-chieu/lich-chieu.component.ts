import { Component, OnInit } from '@angular/core';
import {
  Cinema,
  CinemaSystem,
  ShowTimesCinemaSystem,
} from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-lich-chieu',
  templateUrl: './lich-chieu.component.html',
  styleUrls: ['./lich-chieu.component.scss'],
})
export class LichChieuComponent implements OnInit {
  cinemaSystemList: CinemaSystem[] = [];
  cinemaShowTimesList: Cinema[] = [];
  selectedCinemaSystem: string = null;
  selectedCinema: string = null;
  showTimes: ShowTimesCinemaSystem[] = [];
  constructor(private movieServie: MovieService) {}

  ngOnInit(): void {
    this.movieServie.getCinemaSystem().subscribe();
    this.movieServie.cinemaSystem.subscribe({
      next: (result) => {
        this.cinemaSystemList = result;
        if (this.cinemaSystemList.length > 1) {
          this.selectedCinemaSystem = this.cinemaSystemList[0].maHeThongRap;
          this.movieServie.cinemaSystemId.next(
            this.cinemaSystemList[0].maHeThongRap
          );
        }
      },
    });
    this.movieServie.cinemaSystemId.subscribe({
      next: (result) => {
        this.movieServie.getShowTimesCinemaSystem(result).subscribe({
          next: (result) => {
            this.showTimes = result;
            this.cinemaShowTimesList = result[0].lstCumRap;
            this.selectedCinema = result[0].lstCumRap[0].maCumRap;
          },
        });
      },
    });
  }
  setSelectedCinemaSystem(cinemaSystem_id: string) {
    this.selectedCinemaSystem = cinemaSystem_id;
    this.movieServie.cinemaSystemId.next(this.selectedCinemaSystem);
  }

  setSelectedCinema(cinema_id: string) {
    this.selectedCinema = cinema_id;
  }

  getDate(date: Date) {
    return date?.toString().slice(0, 10);
  }

  getTime(date: Date) {
    return date?.toString().slice(11, 16);
  }
}
