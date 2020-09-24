import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({ 'X-Api-Key': apiKey });

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0;
  categoriaPage = 0;
  categoriaActual = '';

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(category: string) {
    if (this.categoriaActual === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`);
  }
}
