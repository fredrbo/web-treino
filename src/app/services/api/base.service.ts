import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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


    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    protected get<T>(params?: HttpParams): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}`;

        const options = {
            params: params
        };

        return this.http.get<T>(url, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected post<TResponse, TRequest = TResponse>(data: TRequest): Observable<TResponse> {
        const url = `${this.baseUrl}?tabela=${this.table}`;

        const options = {
            headers: this.getHeaders()
        };

        return this.http.post<TResponse>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected put<T>(id: string | number, data: any): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}&id=${id}`;

        const options = {
            headers: this.getHeaders()
        };

        return this.http.put<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected delete<T>(id: string | number): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}&id=${id}`;

        const options = {
            headers: this.getHeaders()
        };

        return this.http.delete<T>(url, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected patch<T>(id: string | number, data: any): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}&id=${id}`;

        const options = {
            headers: this.getHeaders()
        };

        return this.http.patch<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: any): Observable<never> {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

}