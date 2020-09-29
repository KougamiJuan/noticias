import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0;
  categoriaPage = 0;
  categoriaActual = '';

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    const endpoint = apiUrl + query;
    return this.http.get<T>(`${endpoint}&api-key=${apiKey}`);
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<ArticleResponse>(`/articlesearch.json?page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(category: string) {
    if (this.categoriaActual === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 0;
      this.categoriaActual = category;
    }
    return this.ejecutarQuery<ArticleResponse>(`/articlesearch.json?fq=news_desk:(${category})&page=${this.categoriaPage}`);
  }
}
