import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGetDTO, PeliculasPutGetDTO } from './peliculas';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService  {
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/peliculas';

  constructor() { }

  public obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(`${this.urlBase}/landing`);
  }

  
  public crearGet(): Observable<PeliculasPostGetDTO>{
    return this.http.get<PeliculasPostGetDTO>(`${this.urlBase}/postget`);
  }

  public actualizarGet(id: number): Observable<PeliculasPutGetDTO>{
    return this.http.get<PeliculasPutGetDTO>(`${this.urlBase}/putget/${id}`);
  }

  public actualizar(id: number, pelicula: PeliculaCreacionDTO){
    const formData = this.contruirFormData(pelicula);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO>{
    const formData = this.contruirFormData(pelicula);
    return this.http.post<PeliculaDTO>(this.urlBase, formData);
  }
  private contruirFormData(pelicula: PeliculaCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);

    //2025-04-07T15:18:20
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento.toISOString().split('T')[0]);

    if (pelicula.poster){
      formData.append('poster', pelicula.poster);
    }
    if (pelicula.trailer){
      formData.append('trailer', pelicula.trailer);
    }
    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
  
  public borrar(id:number): Observable<any>{
    return this.http.delete(`${this.urlBase}/${id}`);
  }

}
