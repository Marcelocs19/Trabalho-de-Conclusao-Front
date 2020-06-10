import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AlunosProvider {

  url: string = 'localhost:8000';

  constructor(public http: HttpClient) {

  }

  cadastrar(params) {
    return this.http.post(this.url + '/cadastrar', params);
  }

  listar() {
    return this.http.get(this.url);
  }

  editar(id, aluno) {
    return this.http.put(`${this.url}/${id}`, aluno);
  }

  remover(id) {
    return this.http.delete(`${this.url}/${id}`)
  }

}
