import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ⬅️ opcional pero útil

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
    MatInputModule,
    MatSnackBarModule 
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private loginService = inject(LoginService);
  private snack = inject(MatSnackBar); 

  username: string = '';
  password: string = '';
  loading = false;

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
        if (uCtrl.errors['minlength']) console.error(`[ERROR] Username demasiado corto (min ${uCtrl.errors['minlength'].requiredLength}).`);
      }
      if (pCtrl?.errors) {
        if (pCtrl.errors['required']) console.error('[ERROR] Password requerido.');
        if (pCtrl.errors['minlength']) console.error(`[ERROR] Password demasiado corta (min ${pCtrl.errors['minlength'].requiredLength}).`);
      }
      return;
    }

    
    const objectRequest: LoginDto = {
      username: this.username,
      password: this.password
    };

    this.loading = true;
    this.loginService.doLogin(objectRequest).subscribe({
      next: (resp) => {
        console.info('[OK] Login exitoso →', resp);
        
        this.snack.open('Inicio de sesión exitoso', 'Cerrar', { duration: 2000 });

        
        form?.resetForm();
      },
      error: (err) => {
        console.error('[ERROR BACKEND FAKE]', err);
      
        this.snack.open(err?.error || 'Credenciales inválidas', 'Cerrar', { duration: 2500 });
      }
    }).add(() => (this.loading = false));
  }
}