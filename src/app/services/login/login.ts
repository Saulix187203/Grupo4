import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { LoginDto } from '../../interfaces/loginDto';

@Injectable({ providedIn: 'root' })
export class LoginService {
  doLogin(dto: LoginDto): Observable<{ ok: boolean; token?: string; user?: { username: string } }> {
    const DEMO = { username: 'demo', password: '123456' };

    // Simulación de latencia de red (500 ms)
    if (dto.username === DEMO.username && dto.password === DEMO.password) {
      console.info('[FAKE BACKEND] Login exitoso');
      return of({
        ok: true,
        token: 'FAKE_TOKEN_ABC123',
        user: { username: dto.username }
      }).pipe(delay(500));
    }

    console.error('[FAKE BACKEND] Credenciales inválidas');
    return throwError(() => ({
      ok: false,
      error: 'Credenciales inválidas'
    }));
  }
}