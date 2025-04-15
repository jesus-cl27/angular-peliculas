import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PeliculasService } from '../peliculas.service';
@Component({
  selector: 'app-listado-peliculas',
  imports: [ ListadoGenericoComponent, MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.css'
})
export class ListadoPeliculasComponent  {
  
  @Input({required: true})
  peliculas!:any[];

  @Output()
  borrado = new EventEmitter<void>();

  peliculasService = inject(PeliculasService);

  borrar (id: number){
    this.peliculasService.borrar(id)
      .subscribe(() => this.borrado.emit());

  }

  

  

}
