import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-libros-component',
  styleUrl: './libros-component.css',
  templateUrl: './libros-component.html',
})
export class LibrosComponent {

  constructor(private router: Router) {
    if (localStorage.getItem('sesionUsuario') !== 'si') {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionUsuario');
    this.router.navigate(['/login']);
  }
}
