import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO, UsuarioDTO } from './seguridad';
import { Observable, tap } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  private http = inject(HttpClient);
  private urlbase = environment.apiURL + '/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlbase}/registrar`, credenciales)
    .pipe(
      tap(respuestaAutenticacion => this.guardarToken(respuestaAutenticacion))
    )
  }

  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO>{
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlbase}/login`, credenciales)
    .pipe(
      tap(respuestaAutenticacion => this.guardarToken(respuestaAutenticacion))
    )
  }

  obtenerUsuariosPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<UsuarioDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<UsuarioDTO[]>(`${this.urlbase}/ListadoUsuarios`, {params: queryParams, observe: 'response'});
  }

  hacerAdmin(email: string){
    return this.http.post(`${this.urlbase}/haceradmin`, {email});
  }
  removerAdmin(email: string){
    return this.http.post(`${this.urlbase}/removeradmin`, {email});
  }

  guardarToken(respuestaAutenticacionDTO: RespuestaAutenticacionDTO){
    localStorage.setItem(this.llaveToken, respuestaAutenticacionDTO.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacionDTO.expiracion.toString());
  }
  obtenerToken(): string | null{
    return localStorage.getItem(this.llaveToken);
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){return ''};
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  estaLogueado(): boolean{
    const token = localStorage.getItem(this.llaveToken);
    if (!token){
      return false;
    }
    const expiracion = localStorage.getItem(this.llaveExpiracion)!;
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()){
      this.logout();
      return false;
    }

    return true;

  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    const esAdmin = this.obtenerCampoJWT('esAdmin');
    if (esAdmin){
      return 'admin';
    }else{
      return '';
    }

  }
}
