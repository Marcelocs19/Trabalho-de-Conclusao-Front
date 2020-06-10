import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;


@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      console.log(position)
      const pos = new google.maps.LatLng(position.coords.latitude, position.coords.altitude);

      const mapOptions = {
        zoom: 18,
        center: pos,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        position: pos,
        map: this.map,

        //Titulo
        title: 'Minha posição',

        //Animção
        animation: google.maps.Animation.DROP, // BOUNCE
      });
    })

  }

}
