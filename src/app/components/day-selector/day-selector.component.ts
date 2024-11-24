import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DaySelectorComponent),
      multi: true
    }
  ]
})
export class DaySelectorComponent implements ControlValueAccessor {
  @Input() days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  @Output() initialDayChange = new EventEmitter<string>();
  selectedDay: string = '';

  // Métodos de ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  // Se llama cuando el valor cambia en el componente padre
  writeValue(value: any): void {
    this.selectedDay = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementar si necesitas manejar el estado deshabilitado
  }

  // Llama al método onChange cuando el usuario selecciona un día
  selectDay(day: string) {
    this.selectedDay = day;
    this.initialDayChange.emit(day); // Emite el día como string, no como Event
  }
}
