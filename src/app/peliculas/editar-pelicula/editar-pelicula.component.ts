import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({ transform: numberAttribute})
  id!: number;
  pelicula: PeliculaDTO = {
    id: 1, 
    titulo: 'Spider-Man', 
    trailer: 'ABC', 
    fechaLanzamiento: new Date('2018-07-25'), 
    poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'
  };
  generosSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'Accion'},
  ];
  generosNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Drama'},
    
    {llave: 3, valor: 'Comedia'}
  ];
  cinesSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'San Pedro Mall'},
  ];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Agora Mall'},
    
    {llave: 3, valor: 'Acropolis'}
  ];

  actoresSeleccionados: ActorAutoCompleteDTO[] = [
    {id: 3, nombre: 'Leonardo DiCaprio', personaje: '', foto:"https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/300px-Golden_State_Warriors_logo.svg.png"}
  ];
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('editando pelicula', pelicula);

  }


}
