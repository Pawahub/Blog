import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  public formGroup!: UntypedFormGroup;

  @Input() formError = '';
  @Output() login = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  onFormChange(): void {
    this.formError = '';
  }

  onSubmit(): void {
    this.login.emit(this.formGroup.value);
  }
}
