import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'http://localhost:3000/api'; // Configure sua URL base aqui

  constructor(protected http: HttpClient) {}

  /**
   * Método GET genérico
   */
  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<T>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Método POST genérico
   */
  protected post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.getHeaders()
    };

    return this.http.post<T>(url, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Método PUT genérico
   */
  protected put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.getHeaders()
    };

    return this.http.put<T>(url, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Método DELETE genérico
   */
  protected delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.getHeaders()
    };

    return this.http.delete<T>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Método PATCH genérico
   */
  protected patch<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      headers: this.getHeaders()
    };

    return this.http.patch<T>(url, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Configura os headers padrão
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // Adicione outros headers conforme necessário (ex: Authorization)
    });
  }

  /**
   * Manipula erros das requisições HTTP
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Método para definir a URL base dinamicamente
   */
  public setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Método para obter a URL base atual
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
}