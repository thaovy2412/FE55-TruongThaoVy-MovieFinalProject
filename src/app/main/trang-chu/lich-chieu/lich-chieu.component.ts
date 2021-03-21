import { Component, OnInit } from '@angular/core';
import { Cinema, CinemaSystem, ShowTimesCinemaSystem } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-lich-chieu',
  templateUrl: './lich-chieu.component.html',
  styleUrls: ['./lich-chieu.component.scss']
})
export class LichChieuComponent implements OnInit {
  cinemaSystemList: CinemaSystem[] = [];
  cinemaShowTimesList: Cinema[]=[];
  selectedCinemaSystem: string = null;
  selectedCinema: string = null;
  showTimes : ShowTimesCinemaSystem[] =[];
  constructor(private movieServie: MovieService) { }

  ngOnInit(): void {
    this.movieServie.getCinemaSystem().subscribe();
    this.movieServie.cinemaSystem.subscribe({
      next: (result)=>{
        this.cinemaSystemList=result;
        //console.log(this.cinemaSystemList);
        if(this.cinemaSystemList.length>1){
          this.selectedCinemaSystem = this.cinemaSystemList[0].maHeThongRap;
          this.movieServie.cinemaSystemId.next(this.cinemaSystemList[0].maHeThongRap);
          //console.log(this.movieServie.cinemaSystemId.value);
        }
      }
    })
    this.movieServie.cinemaSystemId.subscribe({
      next: (result)=>{
        //console.log(result);
        this.movieServie.getShowTimesCinemaSystem(result).subscribe({
          next: (result) => {
            //console.log(result);
            this.showTimes=result;
            this.cinemaShowTimesList= result[0].lstCumRap;
            console.log(this.cinemaShowTimesList);
            //console.log(this.showTimes);
            this.selectedCinema= result[0].lstCumRap[0].maCumRap;
            //console.log(this.selectedCinema);
          }
        })
      }
    })
  }
  setSelectedCinemaSystem(cinemaSystem_id:string){
    this.selectedCinemaSystem=cinemaSystem_id;
    //console.log(this.selectedCinemaSystem);
    this.movieServie.cinemaSystemId.next(this.selectedCinemaSystem);
    //console.log(this.movieServie.cinemaSystemId.value);
  }

  setSelectedCinema(cinema_id:string){
    this.selectedCinema=cinema_id;
  }

  getDate(date: Date){
    return date?.toString().slice(0,10);
  }

  getTime(date:Date){
    return date?.toString().slice(11,16);
  }
}
