import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login';
import { LoginDto } from '../../interfaces/loginDto';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(LoginService);

  username: string = '';
  password: string = '';

  login() {
    console.log('Usuario:', this.username);
    console.log('Password:', this.password);

    if (this.username !== '' && this.password !== '') {
      const objectRequest: LoginDto = {
        username: this.username,
        password: this.password 
      };

      this.loginService.doLogin(objectRequest).subscribe(entry => {
        if (entry) {
          console.log("login exitoso");
        }
      });
    }

  }
}
