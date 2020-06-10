import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AlunosProvider } from '../../providers/alunos/alunos';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alunoSearch: string;
  alunos: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private alunosService: AlunosProvider) {

  }

  ngOnInit() {
    this.alunosService.listar().subscribe((alunos: any) => {
      this.alunos = alunos;
    })
  }
  

  openMapa() {
    this.navCtrl.push(MapaPage)
  }

}
