import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CinesService } from '../cines.service';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";

@Component({
  selector: 'app-indice-cines',
  imports: [ MatButtonModule, IndiceEntidadComponent],
  templateUrl: './indice-cines.component.html',
  styleUrl: './indice-cines.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
  ]
})
export class IndiceCinesComponent {

}
