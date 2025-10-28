import { GenericListDTO } from './../../components/api-model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ExercicioDTO } from '../../components/exercicio-model';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService extends BaseService {

  constructor() {
    super();
    this.setTable('exercicios');
  }

  getAllExercicios(): Observable<GenericListDTO<ExercicioDTO[]>> {
    return this.get<GenericListDTO<ExercicioDTO[]>>();
  }

  createExercicio(exercicio: ExercicioDTO): Observable<ExercicioDTO> {
    return this.post<ExercicioDTO>(exercicio);
  }

  updateExercicio(exercicio: Partial<ExercicioDTO>): Observable<ExercicioDTO> {
    return this.put<ExercicioDTO>(exercicio);
  }

  deleteExercicio(id: number): Observable<void> {
    return this.delete<void>(id);
  }

}
