import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroAlunoPage } from '../pages/cadastro-aluno/cadastro-aluno';
import { LoginProvider } from '../providers/login/login';
import { AlunosProvider } from '../providers/alunos/alunos';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { MapaPage } from '../pages/mapa/mapa';
import { EditCadastroPage } from '../pages/edit-cadastro/edit-cadastro';
import { FilterBuscaPipe } from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroAlunoPage,
    MapaPage,
    EditCadastroPage,
    FilterBuscaPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroAlunoPage,
    MapaPage,
    EditCadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    AlunosProvider,
    Geolocation
  ]
})
export class AppModule {}
