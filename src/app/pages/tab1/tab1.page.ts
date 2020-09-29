import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Doc } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Doc[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event: any) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?: any) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
      if (res.response.docs.length > 0) {
        this.noticias.push(...res.response.docs);
      }
      if (event) {
        event.target.complete();
        event.target.disabled = (res.response.docs.length === 0);
      }
    });
  }

}
