import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { AlunosProvider } from '../../providers/alunos/alunos';

/**
 * Generated class for the EditCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-cadastro',
  templateUrl: 'edit-cadastro.html',
})
export class EditCadastroPage {

  aluno: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loader: LoadingController,
    public alunosService: AlunosProvider,
    public viewCtrl: ViewController) {
      this.aluno = this.navParams.get('aluno');

  }



  atualizar() {
    let loader = this.loader.create({content: 'Editando...'});
    loader.present();
    this.alunosService.editar(this.aluno.id, this.aluno).subscribe(() => {
      loader.dismiss();
      this.viewCtrl.dismiss(true);
    }, err => {
      console.log('erro ao excluir: ', err);
      loader.dismiss();
      this.viewCtrl.dismiss(false);
    })
  }

}
