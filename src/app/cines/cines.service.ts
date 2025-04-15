import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { CineCreacionDTO, CineDTO } from './cines';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';

@Injectable({
  providedIn: 'root'
})
export class CinesService implements IServicioCRUD<CineDTO, CineCreacionDTO> {

  private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/cines';
  
    constructor() { }
  
   
    public crear(cine: CineCreacionDTO){
      return this.http.post(this.urlBase, cine);
    }

  
    public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<CineDTO[]>>{
      let queryParams = construirQueryParams(paginacion);
      return this.http.get<CineDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
    }
      

    public obtenerPorId(id: number): Observable<CineDTO>{
      return this.http.get<CineDTO>(`${this.urlBase}/${id}`);
  
    }
    public actualizar(id: number, cine: CineCreacionDTO): Observable<any>{
      return this.http.put(`${this.urlBase}/${id}`, cine);
    }
    public borrar(id:number): Observable<any>{
      return this.http.delete(`${this.urlBase}/${id}`);
    }
}
