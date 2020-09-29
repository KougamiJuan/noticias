import { Component, Input, OnInit } from '@angular/core';
import { Doc, Multimedia } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  originDomian = 'http://www.nytimes.com/';
  @Input() noticia: Doc;
  @Input() indice: number;

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {}

  abrirNoticia() {
    this.iab.create(this.noticia.web_url, '_system');
  }

}
