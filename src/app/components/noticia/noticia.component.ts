import { Component, Input, OnInit } from '@angular/core';
import { Doc } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Doc;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() { }

  abrirNoticia() {
    this.iab.create(this.noticia.web_url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn: any;
    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Delete Favorite',
        icon: 'trash',
        cssClass: 'action-custom',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-custom',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share-social',
        cssClass: 'action-custom',
        handler: () => {
          this.compartirNoticia();
        }
      },
        guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-custom',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.headline.main,
        this.noticia.news_desk,
        '',
        this.noticia.web_url
      );
    } else {
      if (navigator.share) {
        navigator.share({
          title: this.noticia.headline.main,
          text: this.noticia.news_desk,
          url: this.noticia.web_url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No Support');
      }
    }
  }

}
