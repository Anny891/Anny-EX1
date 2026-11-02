import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface nuevoLibro {
  id: number;
  nombre: string;
  autor: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-libros-component',
  styleUrl: './libros-component.css',
  templateUrl: './libros-component.html',
})
export class LibrosComponent {

  libros: nuevoLibro[] = [];

  guardarEnLocalStoreage() {
    localStorage.setItem('guardarLibros', JSON.stringify(this.libros));
  }


  constructor(private router: Router) {
    if (localStorage.getItem('sesionUsuario') !== 'si') {
      this.router.navigate(['/login']);
    }

    const datos = localStorage.getItem('guardarLibros');

    if (datos !== null) {
      this.libros = JSON.parse(datos);
    }
  }

  cerrarSesion(){
    localStorage.removeItem('sesionUsuario');
    this.router.navigate(['/login']);
  }
}
