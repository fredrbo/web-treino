import { GenericListDTO } from './../../components/api-model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { UsuariorDTO, CreateUsuarioDTO } from '../../components/usuario-model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService {

  constructor() {
    super();
    this.setTable('usuarios');
  }

  getAllUsuarios(): Observable<GenericListDTO<UsuariorDTO[]>> {
    return this.get<GenericListDTO<UsuariorDTO[]>>();
  }

  createUsuario(usuario: CreateUsuarioDTO): Observable<UsuariorDTO> {
    return this.post<UsuariorDTO, CreateUsuarioDTO>(usuario);
  }

  updateUsuario(usuario: Partial<UsuariorDTO>): Observable<UsuariorDTO> {
    return this.put<UsuariorDTO>(usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.delete<void>(id);
  }

}
