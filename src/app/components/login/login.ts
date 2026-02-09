import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';     
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginService } from '../../services/login/login';
import { LoginDto } from '../../interfaces/loginDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,               
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private loginService = inject(LoginService);

  username: string = '';
  password: string = '';

  login(form?: NgForm) {
    if (form && form.invalid) {
      console.error('[VALIDACIÓN] Formulario inválido:', {
        username: this.username,
        password: this.password ? '***' : '(vacío)'
      });

      const uCtrl = form.controls['username'];
      const pCtrl = form.controls['password'];

      if (uCtrl?.errors) {
        if (uCtrl.errors['required']) console.error('[ERROR] Username requerido.');
        if (uCtrl.errors['minlength']) console.error(
          `[ERROR] Username demasiado corto (min ${uCtrl.errors['minlength'].requiredLength}).`
        );
      }
      if (pCtrl?.errors) {
        if (pCtrl.errors['required']) console.error('[ERROR] Password requerido.');
        if (pCtrl.errors['minlength']) console.error(
          `[ERROR] Password demasiado corta (min ${pCtrl.errors['minlength'].requiredLength}).`
        );
      }
      return;
    }

    if (!this.username || !this.password) {
      console.error('[VALIDACIÓN] Debes completar usuario y contraseña.');
      return;
    }

    const objectRequest: LoginDto = {
      username: this.username,
      password: this.password
    };

    this.loginService.doLogin(objectRequest).subscribe({
      next: (entry) => { if (entry) console.info('[OK] Login exitoso'); },
      error: (err) => console.error('[ERROR BACKEND FAKE]', err)
    });
  }
}