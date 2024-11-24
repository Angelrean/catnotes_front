import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScheduleService } from '../../services/schedule.service';
import { EditSubjectModalComponent } from 'src/app/components/modals/edit-subject-modal/edit-subject-modal.component';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.page.html',
  styleUrls: ['./edit-schedule.page.scss'],
})
export class EditSchedulePage implements OnInit {
  schedules: any[] = []; // Lista de días con sus IDs
  initialDay: string = 'Sunday';
  selectedScheduleId: string = this.initialDay; // ID del horario seleccionado
  subjects: any[] = []; // Lista de subjects para el horario seleccionado


  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadSchedules(); // Cargar los horarios al inicializar el componente
  }

  // Cargar la lista de días (horarios) desde el servicio
  loadSchedules() {
    this.scheduleService.getSchedules().subscribe(
      (response) => {
        this.schedules = response || []; // Guardar los horarios
        if (this.schedules.length > 0) {
          this.selectSchedule(this.schedules[0]._id); // Seleccionar el primer día por defecto
        }
      },
      (error) => {
        console.error('Error al cargar los horarios:', error);
      }
    );
  }

  // Manejar la selección de un día
  selectSchedule(scheduleId: string) {
    this.selectedScheduleId = scheduleId;


    this.loadSubjectsForSchedule(scheduleId);
  }

  // Cargar los subjects para el horario seleccionado
  loadSubjectsForSchedule(scheduleId: string) {
    this.scheduleService.getSubjectsByDay(scheduleId).subscribe(
      (response) => {
        this.subjects = response.subjects || [];
      },
      (error) => {
        console.error('Error al cargar los subjects:', error);
      }
    );
  }

  // Abrir modal para editar un subject existente
  async openEditSubjectModal(subject: any) {
    const modal = await this.modalController.create({
      component: EditSubjectModalComponent,
      componentProps: {
        subjectData: subject,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadSubjectsForSchedule(this.selectedScheduleId); // Recargar los subjects si hubo cambios
      }
    });

    await modal.present();
  }

  // Abrir modal para crear un nuevo subject
  async openNewSubjectModal() {
    const modal = await this.modalController.create({
      component: EditSubjectModalComponent,
      componentProps: {
        subjectData: {
          scheduleId: this.selectedScheduleId, // Preconfigurar el ID del horario
          subjectName: '',
          location: '',
          start: '',
          end: '',
          reminders: [],
        },
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadSubjectsForSchedule(this.selectedScheduleId); // Recargar los subjects si hubo cambios
      }
    });

    await modal.present();
  }
}
