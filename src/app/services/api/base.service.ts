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
        console.log('📤 POST Request URL:', url);
        console.log('📤 POST Data (JSON raw):', data);

        // Enviar JSON puro como raw (igual no Postman)
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<TResponse>(url, data, options)
            .pipe(
                catchError((error) => {
                    console.error('❌ POST falhou:', error);
                    console.error('❌ Status:', error.status);
                    console.error('❌ Response:', error.error);
                    return this.handleError(error);
                })
            );
    }

    protected put<TResponse>(data: any): Observable<TResponse> {
        const url = `${this.baseUrl}?tabela=${this.table}`;
        data.acao = 'put';
        
        console.log('📤 PUT Request URL:', url);
        console.log('📤 PUT Data (JSON):', data);

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<TResponse>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    protected delete<TResponse>(id: string | number): Observable<TResponse> {
        const url = `${this.baseUrl}?tabela=${this.table}`;
        const data = { acao: 'delete', id: id };
        
        console.log('🗑️ DELETE Request URL:', url);
        console.log('🗑️ DELETE Data (JSON):', data);

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<TResponse>(url, data, options)
            .pipe(
                catchError((error) => {
                    console.error('❌ DELETE falhou:', error);
                    console.error('❌ DELETE Status:', error.status);
                    console.error('❌ DELETE Error Code:', error.status);
                    console.error('❌ DELETE URL:', error.url);
                    console.error('❌ DELETE Headers:', error.headers);
                    console.error('❌ DELETE Response Body:', error.error);
                    console.error('❌ DELETE Full Error Object:', JSON.stringify(error, null, 2));
                    return this.handleError(error);
                })
            );
    }

    protected patch<T>(id: string | number, data: any): Observable<T> {
        const url = `${this.baseUrl}?tabela=${this.table}`;
        data.id = id;
        data.acao = 'patch';

        console.log('📤 PATCH Request URL:', url);
        console.log('📤 PATCH Data (JSON):', data);

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<T>(url, data, options)
            .pipe(
                catchError(this.handleError)
            );
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    private handleError(error: any): Observable<never> {
        let errorMessage = '';

        console.log('🔍 Analisando erro completo:', error);
        console.log('🔍 Tipo do erro:', typeof error);
        console.log('🔍 Status do erro:', error.status);
        console.log('🔍 Nome do erro:', error.name);
        console.log('🔍 URL do erro:', error.url);

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente (rede, etc.)
            errorMessage = `Erro de rede: ${error.error.message}`;
            console.error('🌐 Erro de rede/cliente:', error.error);
        } else if (error.status === 0) {
            // Status 0 indica problema de CORS ou conectividade
            errorMessage = `Erro de conectividade (CORS/Rede): Não foi possível conectar com o servidor. Verifique se a API está funcionando e se o CORS está configurado.`;
            console.error('🚫 Possível erro de CORS ou conectividade');
        } else {
            // Erro do servidor
            errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
            console.error('🔥 Erro do servidor:', error.error);
        }

        console.error('💥 Mensagem final de erro:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}