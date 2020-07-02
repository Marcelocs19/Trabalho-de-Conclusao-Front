import { Component, NgZone } from '@angular/core';
import { NavController, ModalController, LoadingController, Refresher, AlertController } from 'ionic-angular';
import { CadastroAlunoPage } from '../cadastro-aluno/cadastro-aluno';
import { AlunosProvider } from '../../providers/alunos/alunos';
import { MapaPage } from '../mapa/mapa';
import { EditCadastroPage } from '../edit-cadastro/edit-cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private alunoSearch: string = '';
  private alunos: Array<any> = new Array();
  private alunosDefault: Array<any> = new Array();
  private alunosSelecionados: Array<any> = new Array();
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loader: LoadingController,
    public alert: AlertController,
    private alunosService: AlunosProvider) {

  }

  ngOnInit() {
    let loader = this.loader.create({
      content: 'Carregando alunos...'
    })
    loader.present();
    this.alunosService.listar().subscribe((alunos: any) => {
      loader.dismiss();
      console.log('alunos: ', alunos);
      this.alunos = alunos;
      this.alunosDefault = alunos;
    }, err => {
      console.log('erro ao listar alunos: ', err);
      loader.dismiss();
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
      console.log('retorno: ', retorno);
      if (retorno) {
        this.alunos.push(retorno);
        //this.alunosDefault.push(retorno);
      }
    })

  }

  filter(value): any {
    console.log(value);
    if (value) {
      this.alunos = this.alunosDefault.filter(item => {
        return (
          item.nome.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.sobrenome.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.endereco.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.numero.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.cpf.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.bairro.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
    } else {
      this.alunos = this.alunosDefault;
    }

  }


  edit(aluno) {
    let alunoSelecionado = aluno;
    let modal = this.modalCtrl.create(EditCadastroPage, { aluno: alunoSelecionado });
    modal.present();
    modal.onWillDismiss(retorno => {
      if (retorno) {
        this.alunos.map(aluno => {
          if (aluno.cpf == retorno.cpf) {
            aluno.bairro = retorno.bairro
            aluno.cpf = retorno.cpf
            aluno.email = retorno.email
            aluno.endereco = retorno.endereco
            aluno.nome = retorno.nome
            aluno.numero =  retorno.numero
            aluno.sobrenome= retorno.sobrenome
            aluno.enderecoCompleto = retorno.enderecoCompleto
          }
        })
      }
    })
  }

  remove(aluno) {
    let loader = this.loader.create({ content: 'Excluindo...' });
    loader.present();
    this.alunosService.remover(aluno.id).subscribe(() => {
      this.alunos = this.alunos.filter(alunoArr => {
        return aluno.id != alunoArr.id;
      })
      loader.dismiss();
    }, err => {
      console.log('erro ao excluir: ', err);
      if (err.status == 200) {
        this.alunos = this.alunos.filter(alunoArr => {
          return aluno.id != alunoArr.id;
        })
      }
      loader.dismiss();
    })
  }

  toggleSelect(id?, index?) {
    this.alunos.map((aluno, i) => {
      if (i == index) {
        aluno.selected = !aluno.selected;
      }
    })
    let aluno = this.alunos[index];

    if (aluno.selected) {
      this.alunosSelecionados.push(aluno)
    } else {
      this.alunosSelecionados = this.alunosSelecionados.filter(alunoObj => {
        return alunoObj.cpf != aluno.cpf;
      })
    }
    console.log(this.alunosSelecionados)
  }

  openMapa(dados) {
    let nomes = [];
    this.alunosSelecionados.forEach(aluno => {
      nomes.push(`<b>Aluno:</b> ${aluno.nome}, <br> <b>Endereço:</b> ${aluno.endereco} <br> <br>`)
    })
    let alert = this.alert.create({
      title: 'Alunos selecionados para rota:',
      message: nomes.join(),
      buttons: [
        {
          role: 'ok', 
          text: 'Confirmar',
          handler: () => {this.navCtrl.push(MapaPage, {data: this.alunosSelecionados})}
        },
        {
          role: 'cancel',
          text: 'Cancelar',
        }
      ]
    })
    alert.present();
  }

}
