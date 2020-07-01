import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlunosProvider } from '../../providers/alunos/alunos';

@IonicPage()
@Component({
  selector: 'page-cadastro-aluno',
  templateUrl: 'cadastro-aluno.html',
})
export class CadastroAlunoPage {
  
  nome: string;
  endereco: string;
  numero:number;
  bairro:string;
  email: string;
  sobrenome: string;
  cpf: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alunosService: AlunosProvider) {
  }

  cadastrar() {
    let params = { 
      nome: this.nome,
      sobrenome: this.sobrenome, 
      endereco: this.endereco, 
      bairro: this.bairro,
      numero: this.numero,
      email: this.email,
      cpf: this.cpf
    }
    this.alunosService.cadastrar(params).subscribe(retorno => {
      if (retorno) {
        this.viewCtrl.dismiss(retorno);
      } else {
        this.viewCtrl.dismiss()
      }
    }, err => {
      console.log('erro: ', err);
    })
    

  }

}
