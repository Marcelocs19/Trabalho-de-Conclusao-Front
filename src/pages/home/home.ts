import { Component, NgZone } from '@angular/core';
import { NavController, ModalController, LoadingController, Refresher } from 'ionic-angular';
import { CadastroAlunoPage } from '../cadastro-aluno/cadastro-aluno';
import { AlunosProvider } from '../../providers/alunos/alunos';
import { MapaPage } from '../mapa/mapa';
import { EditCadastroPage } from '../edit-cadastro/edit-cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alunoSearch: string = '';
  alunos: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loader: LoadingController,
    private alunosService: AlunosProvider) {

  }

  ngOnInit() {
     this.alunosService.listar().subscribe((alunos: any) => {
       console.log('alunos: ', alunos);
       this.alunos = alunos;
     });
  
   this.createSelects();
  }

  createSelects() {
    this.alunos.map(aluno => {
      aluno.selected = false;
    })
  }

  openCadastro() {
    let modal = this.modalCtrl.create(CadastroAlunoPage);
    modal.present();
    modal.onWillDismiss(retorno => {
      if (retorno) {
        this.alunos.push(retorno);
      }
    })   
    
  }

  
  edit(aluno) {
    let modal = this.modalCtrl.create(EditCadastroPage, {aluno: aluno});
    modal.present();
    modal.onWillDismiss(retorno => {
      if (retorno) {
        this.alunos.push(retorno);
      }
    })
  }

  remove(aluno) {
    let loader = this.loader.create({content: 'Excluindo...'});
    loader.present();
    this.alunosService.remover(aluno.id).subscribe(() => {
      this.alunos = this.alunos.filter(alunoArr => {
        return aluno.id != alunoArr.id;
      })
      loader.dismiss();
    }, err => {
      console.log('erro ao excluir: ', err);
      loader.dismiss();
    })
  }

  openMapa() {
    let selecionados = this.alunos.filter(aluno => {
      return aluno.selected;
    })
    //alert(selecionados.length);
    this.navCtrl.push(MapaPage)
  }

}
