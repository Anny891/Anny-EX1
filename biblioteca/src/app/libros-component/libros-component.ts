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
  bajarPosicion = -1;

  agregar() {
    if (this.titulo.trim() == '' || this.autor.trim() === '') {
      alert('Debe completar todos los campos');
      return;
    }

    if (this.bajarPosicion == -1) {
    const  nuevoLibro = {
      id: Math.max(...this.libros.map(libro => libro.id), 0) + 1,
      titulo: this.titulo,
      autor: this.autor
    };

     this.libros.push(nuevoLibro);
    } else {
      this.libros[this.bajarPosicion].titulo = this.titulo;
      this.libros[this.bajarPosicion].autor = this.autor;
    }

   
    this.limpiar();
    this.guardarEnLocalStoreage();
    this.bajarPosicion = -1;

  }  
  
  limpiar(){
    this.titulo = '';
    this.autor = '';
    this.bajarPosicion = -1;
  }

  editar( i: number) {
    this.bajarPosicion = i;
    this.titulo = this.libros[i].titulo;
    this.autor = this.libros[i].autor;
  }

  eliminar(i: number) {
    if (confirm('¿Está seguro de eliminar este libro?')) {
      this.libros.splice(i, 1);
      this.guardarEnLocalStoreage();
    }
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
