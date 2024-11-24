import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  hours: any[] = [];  // Almacena las 24 horas con sus subjects
  filteredSubjects: any[] = []; // Solo las horas con subjects válidos
  initialDay: string = 'Sunday';

  constructor(private readonly scheduleService: ScheduleService) {}

  ngOnInit() {
    this.initializeHours();
    this.loadSubjectsByDay(this.initialDay);
  }

  onDaySelected(selectedDay: string) {
    this.initialDay = selectedDay;
    this.loadSubjectsByDay(selectedDay);
  }

  loadSubjectsByDay(day: string): void {
    this.scheduleService.getSubjectsByDay(day).subscribe(
      (data) => {
        console.log(data);

        this.hours = this.mapSubjectsToHours(data.subjects);
        this.filteredSubjects = this.hours.filter(hour => hour.subject !== null); // Filtrar horas válidas
      },
      (error) => {
        console.error(`Error fetching subjects for ${day}:`, error);
      }
    );
  }

  initializeHours() {
    this.hours = Array.from({ length: 24 }, (_, i) => ({
      hour: this.formatHour(i),
      subject: null,
    }));
  }

  formatHour(hour: number): string {
    return `${hour < 10 ? '0' + hour : hour}:00`;
  }

  mapSubjectsToHours(subjects: any[]): any[] {
    const mappedSubjects = [...this.hours];
    subjects.forEach((subject) => {
      const startHour = this.parseHour(subject.start);
      const hourIndex = this.hours.findIndex(h => h.hour === this.formatHour(Math.floor(startHour)));
      if (hourIndex !== -1) {
        mappedSubjects[hourIndex].subject = subject;
      }
    });
    return mappedSubjects;
  }

  parseHour(dateTime: string): number {
    const date = new Date(dateTime);
    return date.getHours();
  }
}
