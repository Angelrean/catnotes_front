import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent  {
  nameFormControl= new FormControl('',[Validators.required]);
  usernameFormControl = new FormControl('',[Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)$')]);
  repeatPasswordFormControl= new FormControl('', [Validators.required,Validators.min(6)]);

  onSubmit() {
    console.log('Full Name:', this.nameFormControl.value);
    console.log('Username:', this.usernameFormControl.value);
    console.log('Email:', this.emailFormControl.value);
    console.log('Password:', this.passwordFormControl.value);
    console.log('Repeat Password:', this.repeatPasswordFormControl.value);
  }
}
