import { Component, Input, OnInit } from '@angular/core';
import { Doc, Multimedia } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  originDomian = 'http://www.nytimes.com/';
  @Input() noticia: Doc;
  @Input() indice: number;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() { }

  abrirNoticia() {
    this.iab.create(this.noticia.web_url, '_system');
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share-social',
        cssClass: 'action-custom',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.headline.main,
            this.noticia.news_desk,
            '',
            this.noticia.web_url
          );
        }
      }, {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-custom',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-custom',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
