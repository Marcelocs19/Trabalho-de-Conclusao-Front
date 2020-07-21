import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { AlunosProvider } from '../../providers/alunos/alunos';
declare var google: any;

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

  private alunoSelecionado: any = {};


  autoCompleteItems = [];
  GoogleAutocomplete;
  address: string = '';
  selecionouEnd: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loader: LoadingController,
    public alunosService: AlunosProvider,
    public viewCtrl: ViewController,
    public changeRef: ChangeDetectorRef
    ) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

  }

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }


  ionViewWillEnter() {
    this.alunoSelecionado = this.navParams.get('aluno');

  }

  closeModal() {
    this.viewCtrl.dismiss(false);
  }



  atualizar() {
    let loader = this.loader.create({content: 'Editando...'});
    loader.present();
    this.alunosService.editar(this.alunoSelecionado.id, this.alunoSelecionado).subscribe((retorno) => {
      loader.dismiss();
      this.viewCtrl.dismiss(retorno);
    }, err => {
      console.log('erro ao excluir: ', err);
      loader.dismiss();
      this.viewCtrl.dismiss(false);
    })
  }

  updateSearchResults() {
    //busca a lista de enderecos de acordos com o que o usuario digita
    if (!this.alunoSelecionado.endereco) {
      this.autoCompleteItems = [];
      this.selecionouEnd = false;
      return;
    }
    if (this.alunoSelecionado.endereco == this.address) {
      return this.autoCompleteItems = [];
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.alunoSelecionado.endereco, componentRestrictions: { country: 'br' } },
      (predictions, status) => {
        this.autoCompleteItems = [];
        if (predictions) {
          predictions.forEach((prediction) => {
            if (prediction.description == this.alunoSelecionado.endereco) return this.autoCompleteItems = [];
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
    this.alunoSelecionado.endereco = address.terms[0].value;
    this.alunoSelecionado.numero = address.terms[1].value;
    this.alunoSelecionado.bairro = address.terms[2].value;
  }

}
