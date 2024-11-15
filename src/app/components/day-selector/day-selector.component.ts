import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
})
export class DaySelectorComponent  implements OnInit {

  
  initialDay: string = '';
  
  weekDay=['Sunday', 'Monday', 'Thuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']

  constructor() { 
    const today = new Date();
    const indexDay = today.getDay();
    this.initialDay = this.weekDay[indexDay];
    }

  ngOnInit() {}
  

}
