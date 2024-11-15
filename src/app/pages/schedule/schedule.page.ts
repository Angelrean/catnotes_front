import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  hours: string[] = [];  // Almacena las 24 horas del día

  constructor() {}

  ngOnInit() {
    this.loadInitialHours();  
  }

  loadInitialHours() {
    // Genera las 24 horas del día (00:00 - 23:00)
    for (let i = 0; i < 24; i++) {
      this.hours.push(this.formatHour(i));
    }
  }

  formatHour(hour: number): string {
    // Convierte el número de la hora a formato 24 horas (00:00 - 23:00)
    return `${hour < 10 ? '0' + hour : hour}:00`;
  }

}
