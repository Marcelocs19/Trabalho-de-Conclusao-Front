import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AlunosProvider } from '../../providers/alunos/alunos';
declare var google;

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

  //autocomplete
  autoCompleteItems = [];
  GoogleAutocomplete;
  address: string = '';
  selecionouEnd: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loader: LoadingController,
    public viewCtrl: ViewController,
    private alunosService: AlunosProvider) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

  }

  cadastrar() {
    let loader = this.loader.create({
      content: 'Cadastrando...'
    });
    loader.present();
    let params = { 
      nome: this.nome,
      sobrenome: this.sobrenome, 
      endereco: this.endereco, 
      bairro: this.bairro,
      numero: this.numero,
      email: this.email,
      cpf: this.cpf,
      enderecoCompleto: this.address
    }
    this.alunosService.cadastrar(params).subscribe(retorno => {
      loader.dismiss();
      if (retorno) {
        this.viewCtrl.dismiss(retorno);
      } else {
        this.viewCtrl.dismiss()
      }
    }, err => {
      loader.dismiss();

      console.log('erro: ', err);
    })
    

  }

  updateSearchResults() {
    //busca a lista de enderecos de acordos com o que o usuario digita
    if (!this.endereco) {
      this.autoCompleteItems = [];
      this.selecionouEnd = false;
      return;
    }
    if (this.endereco == this.address) {
      return this.autoCompleteItems = [];
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.endereco, componentRestrictions: { country: 'br' } },
      (predictions, status) => {
        this.autoCompleteItems = [];
        if (predictions) {
          predictions.forEach((prediction) => {
            if (prediction.description == this.endereco) return this.autoCompleteItems = [];
            this.autoCompleteItems.push(prediction);
          });
        } else {
          this.autoCompleteItems = [];
        }
      })
  }

  selectAddress(address) {
    console.log(address)
    // ao selecionar um end. da lista, usa ele para passar por parametro e coloca na model do end.
    this.address = address.description;
    this.autoCompleteItems = [];
    this.selecionouEnd = true;
    this.endereco = address.terms[0].value;
    this.numero = address.terms[1].value;
    this.bairro = address.terms[2].value;
  }

}
