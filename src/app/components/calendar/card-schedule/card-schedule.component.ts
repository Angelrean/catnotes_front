import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-card-schedule',
  templateUrl: './card-schedule.component.html',
  styleUrls: ['./card-schedule.component.scss'],
})
export class CardScheduleComponent  {

  @Input() subjects: any[] = []


  constructor() { }


}
