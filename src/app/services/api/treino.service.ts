import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { TreinoDTO } from '../../components/treino-model';


@Injectable({
  providedIn: 'root'
})
export class TreinoService extends BaseService {

  constructor() {
    super();
    this.setTable('treinos');
  }

  // Métodos específicos do serviço de treinos
  getAllTreinos(): Observable<TreinoDTO[]> {
    return this.get<TreinoDTO[]>();
  }

  createTreino(treino: TreinoDTO): Observable<TreinoDTO> {
    return this.post<TreinoDTO>(treino);
  }

  updateTreino(id: number, treino: Partial<TreinoDTO>): Observable<TreinoDTO> {
    return this.put<TreinoDTO>(id, treino);
  }

  deleteTreino(id: number): Observable<void> {
    return this.delete<void>(id);
  }

  getTreinosByUsuario(usuarioId: number): Observable<TreinoDTO[]> {
    // Exemplo de como usar parâmetros customizados
    return this.get<TreinoDTO[]>();
  }
}
