import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login-component',
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {

  usuario = '';
  contrasena = '';
  
  constructor(private router: Router) {}

  ingresar(){
    if(this.usuario === 'admin' && this.contrasena === '1234'){
      localStorage.setItem('sesionUsuario', 'si');
      this.router.navigate(['/libros']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
