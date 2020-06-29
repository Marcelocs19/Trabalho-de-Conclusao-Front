import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AlunosProvider {

  url: string = 'https://sapef.herokuapp.com';
  //url: string = 'http://localhost:8080';

  constructor(public http: HttpClient) {    
  }

  login(params) {
    return this.http.post(this.url + '/login', params);
  }

  cadastrar(params) {
    return this.http.post(this.url + '/cadastrar', params);
  }

  listar() {
    return this.http.get(this.url + '/alunos/listarAlunos');
  }

  editar(id, aluno) {
    return this.http.put(`${this.url}/${id}`, aluno);
  }

  remover(id) {
    return this.http.delete(`${this.url}/${id}`)
  }

}
