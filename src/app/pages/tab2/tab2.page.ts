import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // El valor {static} con el valor true, permite que se muestre el valor seccionado por defecto
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ionViewDidEnter() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria(event: any) {
    this.infiniteScroll.disabled = false;
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?: any) {
    this.noticiasService.getTopHeadlinesByCategory(categoria).subscribe(res => {
      if (res.articles.length > 0) {
        this.noticias.push(...res.articles);
      }
      if (event) {
        event.target.complete();
        event.target.disabled = (res.articles.length === 0);
      }
    });
  }

  loadData(event: any) {
    this.cargarNoticias(this.segment.value, event);
  }

}
