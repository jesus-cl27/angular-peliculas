import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop'
import { MatIconModule } from '@angular/material/icon';
import { ActorAutoCompleteDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatAutocompleteModule, FormsModule, 
    MatTableModule, MatInputModule, MatIconModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent implements OnInit {
  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if (typeof valor === 'string' && valor){
        this.actoresService.obtenerPorNombre(valor).subscribe(actores =>{
          this.actores = actores;
        })
      }
    })
  }
  control = new FormControl();
  actores: ActorAutoCompleteDTO[] = [];
  actoresService = inject(ActoresService)
   

  @Input({required: true})
  actoresSeleccionados: ActorAutoCompleteDTO[] = [];
  
  columnaAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<ActorAutoCompleteDTO>;

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table != undefined){
      this.table.renderRows();
    }
  }
  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: ActorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutoCompleteDTO)=> a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

}
