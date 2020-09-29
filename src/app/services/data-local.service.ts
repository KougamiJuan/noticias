import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Doc } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Doc[] = [];

  constructor(private storage: Storage, private toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }


  guardarNoticia(noticia: Doc) {
    const existe = this.noticias.find(noti => noti._id === noticia._id);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
    this.presentToast('Added to favorites');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Doc) {
    this.noticias = this.noticias.filter(noti => noti._id !== noticia._id);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Deleted to favorites.');
  }

}
