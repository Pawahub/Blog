import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  public formGroup!: FormGroup;

  @Input() formError = '';
  @Output() login = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onFormChange(): void {
    this.formError = '';
  }

  onSubmit(): void {
    this.login.emit(this.formGroup.value);
  }
}
