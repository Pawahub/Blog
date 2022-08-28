import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginUiComponent } from './login-ui/login-ui.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginUiComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginUiComponent
  ]
})
export class LoginModule {
}
