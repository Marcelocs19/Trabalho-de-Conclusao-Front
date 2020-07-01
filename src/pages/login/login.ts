import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlunosProvider } from '../../providers/alunos/alunos';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loginService: AlunosProvider) {
  }

  //ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  //}

  login() {
     //this.loginService.login({email: this.email, senha: this.senha})
     //.subscribe(result => {
       //if (result) {
         //this.navCtrl.setRoot(HomePage);
       //}
     //})
   this.navCtrl.setRoot(HomePage)
  }

}
