import { Component } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CinesService } from '../cines.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
  selector: 'app-crear-cine',
  imports: [ CrearEntidadComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
  providers: [
        {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
      ]
})
export class CrearCineComponent {
  formularioCines = FormularioCinesComponent

}
