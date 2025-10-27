import { GenericListDTO } from './../../components/api-model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HistoricoDTO } from '../../components/historico-model';


@Injectable({
  providedIn: 'root'
})
export class HistoricoService extends BaseService {

  constructor() {
    super();
    this.setTable('historico-treinos');
  }

  getAllHistorico(): Observable<GenericListDTO<HistoricoDTO[]>> {
    return this.get<GenericListDTO<HistoricoDTO[]>>();
  }

  createHistorico(historico: HistoricoDTO): Observable<HistoricoDTO> {
    return this.post<HistoricoDTO>(historico);
  }

  updateHistorico(id: number, historico: Partial<HistoricoDTO>): Observable<HistoricoDTO> {
    return this.put<HistoricoDTO>(id, historico);
  }

  deleteHistorico(id: number): Observable<void> {
    return this.delete<void>(id);
  }

  getHistoricoByUsuario(usuarioId: number): Observable<HistoricoDTO[]> {
    // Histórico de um usuário específico
    return this.get<HistoricoDTO[]>();
  }

  getHistoricoByTreino(treinoId: number): Observable<HistoricoDTO[]> {
    // Histórico de um treino específico
    return this.get<HistoricoDTO[]>();
  }

  getHistoricoByPeriodo(dataInicio: Date, dataFim: Date): Observable<HistoricoDTO[]> {
    // Histórico por período
    return this.get<HistoricoDTO[]>();
  }
}
