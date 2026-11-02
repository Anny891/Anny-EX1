import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface nuevoLibro {
  id: number;
  titulo: string;
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

  titulo = '';
  autor = '';

  agregar() {
    if (this.titulo.trim() == '' || this.autor.trim() === '') {
      alert('Debe completar todos los campos');
      return;
    }

    const  nuevoLibro = {
      id: Math.max(...this.libros.map(libro => libro.id), 0) + 1,
      titulo: this.titulo,
      autor: this.autor
    };

    this.libros.push(nuevoLibro);
    this.limpiar();
    this.guardarEnLocalStoreage();

  }  
  
  limpiar(){
    this.titulo = '';
    this.autor = '';
  }
  
  
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
