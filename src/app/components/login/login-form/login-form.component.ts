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
  @Input() disabled = false;

  @Output() login = new EventEmitter();

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('testname', [Validators.required]),
      password: new FormControl('testpassword', [Validators.required])
    });
  }

  onFormChange(): void {
    this.formError = '';
  }

  onSubmit(): void {
    this.login.emit(this.formGroup.value);
  }
}
