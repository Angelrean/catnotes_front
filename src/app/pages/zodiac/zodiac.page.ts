import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from 'src/app/services/horoscope.service';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.page.html',
  styleUrls: ['./zodiac.page.scss'],
})
export class ZodiacPage implements OnInit {

  horoscope: any;
  showHoroscope = false; // Flag to control visibility

  constructor(private horoscopeService: HoroscopeService) { }

  ngOnInit() {

    this.getHoroscope('scorpio');
  }

  getHoroscope(sign: string){
    this.horoscopeService.getHoroscope(sign).subscribe(response =>{
      this.horoscope = response;
      this.showHoroscope = true; // Show results when available
    }, error => {
      console.error('Error al encontrar horoscopo: ', error);
    });
  }

  onSignChange(event: any){
    const selectedSign = event.detail.value;
    this.getHoroscope(selectedSign);
    this.showHoroscope = false; // Reset visibility flag for new request
  }

}