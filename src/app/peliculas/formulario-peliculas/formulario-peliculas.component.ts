import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { fechaNoPuedeSerFutura } from '../../compartidos/funciones/validaciones';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";
import { AutocompleteActoresComponent } from '../../actores/autocomplete-actores/autocomplete-actores.component';
import { ActorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-formulario-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, RouterLink, MatDatepickerModule, InputImgComponent, SelectorMultipleComponent, AutocompleteActoresComponent],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.css'
})
export class FormularioPeliculasComponent implements OnInit {
  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }
  private formBuilder = inject(FormBuilder);

  @Input({required: true})
  generosNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  generosSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  cinesNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  cinesSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  actoresSeleccionados!: ActorAutoCompleteDTO[];
  
  @Input()
  modelo?: PeliculaDTO;


  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  form = this.formBuilder.group({
    titulo: ['', {
      validators: [Validators.required]
    }],
    fechaLanzamiento: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    trailer: '',
    poster: new FormControl<File | string | null>(null)
  });

  archivoSeleccionado(file: File){
    this.form.controls.poster.setValue(file);
  }
  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const pelicula = this.form.value as PeliculaCreacionDTO;
    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    pelicula.generosIds = generosIds;

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    pelicula.cinesIds = cinesIds;

    pelicula.actores = this.actoresSeleccionados;


    this.posteoFormulario.emit(pelicula);
  }
  obtenerErrorCampoTitulo(){
    let campo = this.form.controls.titulo;
    if (campo.hasError('required')){
      return 'El campo titulo es requerido';
    }
    return "";
  }

  obtenerErrorCampoFechaLanzamiento(){
    let campo = this.form.controls.fechaLanzamiento;
    if (campo.hasError('required')){
      return 'El campo fecha lanzamiento es requerido';
    }
    if (campo.hasError('futuro')){
      return campo.getError('futuro').mensaje;
    }
    return "";
  }

}
