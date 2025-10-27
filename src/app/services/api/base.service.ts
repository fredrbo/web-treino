import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private http = inject(HttpClient);
    private configService = inject(ConfigService);
    protected table: string = '';

    constructor() { }

    protected setTable(table: string): void {
        this.table = table;
    }

    protected get baseUrl(): string {
        return this.configService.apiUrl;
    }


    protected get<T>(params?: HttpParams): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}`;
        console.log('🌐 GET Request URL:', url);
            
        // Para Google Apps Script, é melhor não enviar headers customizados
        const options = {
            params: params
        };
        
        return this.http.get<T>(url, options)
            .pipe(
                tap((response) => {
                    console.log('✅ Resposta recebida:', response);
                    console.log('Tipo da resposta:', typeof response);
                }),
                catchError((error) => {
                    console.error('❌ Erro na requisição:', error);
                    console.error('URL que falhou:', url);
                    console.error('Status:', error.status);
                    console.error('Response:', error.error);
                    return this.handleError(error);
                })
            );
    }

    protected post<T>(data: any): Observable<T> {
        const url = `${this.baseUrl}/${this.table}`;
        const options = {
            headers: this.getHeaders()
        };

        return this.http.post<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected put<T>(id: string | number, data: any): Observable<T> {
        const url = `${this.baseUrl}/${this.table}/${id}`;
        const options = {
            headers: this.getHeaders()
        };

        return this.http.put<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected delete<T>(id: string | number): Observable<T> {
        const url = `${this.baseUrl}/${this.table}/${id}`;
        const options = {
            headers: this.getHeaders()
        };

        return this.http.delete<T>(url, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected patch<T>(id: string | number, data: any): Observable<T> {
        const url = `${this.baseUrl}/${this.table}/${id}`;
        const options = {
            headers: this.getHeaders()
        };

        return this.http.patch<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Removendo CORS headers que podem causar problema com Google Apps Script
        });
    }

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

}