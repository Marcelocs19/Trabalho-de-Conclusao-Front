import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var L: any;
import 'leaflet';
import 'leaflet-routing-machine';
import { AlunosProvider } from '../../providers/alunos/alunos';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  waypoints = []
  control: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alunosService: AlunosProvider
  ) {
  }

  getCoordenadasProfessor() {
    let promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(data => {
        console.log(data)
        resolve({
          lat: data.coords.latitude,
          lng: data.coords.longitude
        })
      }, err => {
        reject(err);
      })
    });

    return promise;

  }

  ionViewWillEnter() {
    console.log(L.Routing)
    this.initMap();
    /*     
          L.Routing.errorControl(this.control).addTo(this.map);
    
    
          L.Routing.itinerary({
          pointMarkerStyle: { radius: 5, color: '#03f', fillColor: 'white', opacity: 1, fillOpacity: 0.7 },
          //show: true
        }).addTo(this.map);
    
    
        L.on('click', function () {
          alert('btn');
          let newWaypoints = [
            L.latLng(51.832493, -0.111371),
            L.latLng(51.7902237, -0.1209),
            L.latLng(51.75834, -0.127736)
          ];
    
         this.control.setWaypoints(newWaypoints);
        });
    
    
    
        function createSVGRoutingMarker() {
          let primaryColor = '#FFDDCC';
          let strokeCoreColor = '#34FDCF';
          let strokeColor = '#333333';
          let selected = false
          let baseSize = 18;
          const centerStrokeWidth = 3;
          const colors = this.palette.colorForVan();
          const displayCross = null;
    
          const selectedAddon = selected ? ' stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="null" stroke-width="40" ' : '';
    
          const icon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="500">
                  <path style="fill:#FFDDCC; fill-rule:evenodd" ${selectedAddon} d="M 295.78419,86.816926 L 295.78419,335.08252 L 687.71625,335.40310 C 664.71649,354.19396 650.35734,380.09418 650.54503,414.08813 L 261.47933,413.85667 C 257.75238,281.97351 70.642616,282.42223 66.576854,413.09434 C 38.473995,412.88466 34.575813,406.50199 34.304870,380.61469 L 34.304868,281.61469 C 33.952015,237.37253 28.426810,266.57731 61.177014,182.67997 C 94.875059,93.246445 85.585107,101.51291 116.06480,99.204795 L 295.78419,86.816926 z M 217.93865,233.19966 L 219.48981,127.72046 L 119.43969,133.92512 C 101.20003,135.14704 101.04823,135.26154 94.621050,156.41701 L 69.026832,224.66825 C 60.428592,245.60250 61.797130,251.77115 85.314062,248.71131 L 217.93865,233.19966 z M 966.63494,335.59074 L 966.82552,391.36792 L 902.21802,414.23783 L 845.49140,414.20156 C 845.72230,381.85903 832.28136,354.65711 808.44981,335.54893 L 966.63494,335.59074 z " />
                  <rect x="335.82718" y="12.158683" height="301.70154" width="631.32404" style="fill:${strokeColor};" ${selectedAddon} />
                  <circle r="77" cx="164" cy="412" style="fill:${strokeCoreColor};" ${selectedAddon} />
                  <circle r="77" cx="748" cy="412" style="fill:${strokeCoreColor};" ${selectedAddon} />
                </svg>`;
    
          let url = "data:image/svg+xml;base64," + btoa(icon);
          return L.icon({
            iconUrl: url,
            iconSize: [baseSize * 2, baseSize],
            shadowSize: [12, 10],
            iconAnchor: [baseSize / 2, baseSize / 2],
            popupAnchor: [0, 0],
            className: "van-marker"
          });
        } */

    // http://www.liedman.net/L-routing-machine/tutorials/
    // DOC : http://www.liedman.net/L-routing-machine/api/#l-routing-control
  }

  initMap() {
    this.map = L.map("map").fitWorld();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,

    }).addTo(this.map);

    this.map.locate({
      setView: true,
      maxZoom: 18
    }).on('locationfound', (e) => {
      console.log('achei', e)
      this.ajustarPosicaoAtual({ lat: e.latitude, lng: e.longitude })
        .then(() => {
          this.waypoints.push(L.latLng(e.latitude, e.longitude))
          this.transformAddress().then(retorno => {
            retorno.forEach(ret => this.waypoints.push(ret))
            console.log(this.waypoints);
            //let a = this.getDistance(this.waypoints[0], this.waypoints[1]);
            //console.log(a);
            this.ajustarControlRouting()
          });
        });

    }).on('locationerror', (err) => {
      alert(err.message);
    })
  }

  ajustarPosicaoAtual(coordenadas) {
    console.log('coordS: ', coordenadas)
    let markerGroup = L.featureGroup();
    let marker: any = L.marker([coordenadas.lat, coordenadas.lng], { icon: this.redIcon })
    markerGroup.addLayer(marker)
    return Promise.resolve(this.map.addLayer(markerGroup))

  }

  ajustarControlRouting() {
    this.control = L.Routing.control({
      "type": "LineString",
      waypoints: this.waypoints,
      lineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'red', opacity: 1, weight: 2 }
        ],
        missingRouteStyles: [
          { color: 'black', opacity: 0.5, weight: 7 },
          { color: 'white', opacity: 0.6, weight: 4 },
          { color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12' }
        ]
      },

      show: true,
      addWaypoints: true,
      autoRoute: true,
      routeWhileDragging: false,
      draggableWaypoints: false,
      useZoomParameter: false,
      showAlternatives: true,
      //  geocoder: L.Control.Geocoder.nominatim(),
      /*
      routingstart: function(){
         console.log('routingstart')
      } */
    }).addTo(this.map)
      .on('routingerror', (e) => {
        try {
          this.map.getCenter();
        } catch (e) {
          console.log('cai no catch e', e)
          this.map.fitBounds(L.latLngBounds(this.waypoints));
        }
        //handleError(e);
      })

  }

  



  async transformAddress() {
    let alunos = this.navParams.get('data');
    let enderecos = [];
    alunos.forEach(aluno => enderecos.push(aluno.enderecoCompleto))

    let promises = [];

    let getCoords = (address) => {
      let promise = new Promise((resolve, reject) => {
        this.alunosService.getCoords(address)
          .subscribe(retorno => {
            console.log(retorno);
            resolve(retorno[0]);
          })
      })
      return promise;
    }

    enderecos.map(mock => {
      promises.push(getCoords(mock))
    })



    console.log('promessas locais: ', promises);

    return Promise.all(promises)

  }

  formatWaypoints(items) {
    let waypoints = [];
    items.forEach(item => {
      waypoints.push(L.latLng(item.lat, item.lon));
    })

    return waypoints
  }

  getDistance(origin, destination) {

    let toRadian = (degree) => {
      return degree * Math.PI / 180;
    }
    // return distance in meters
    var lon1 = toRadian(origin[1]),
      lat1 = toRadian(origin[0]),
      lon2 = toRadian(destination[1]),
      lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }





}
