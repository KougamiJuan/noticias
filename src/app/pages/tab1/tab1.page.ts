import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event: any) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?: any) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
      if (res.articles.length > 0) {
        this.noticias.push(...res.articles);
      }
      if (event) {
        event.target.complete();
        event.target.disabled = (res.articles.length === 0);
      }
    });
  }

}
