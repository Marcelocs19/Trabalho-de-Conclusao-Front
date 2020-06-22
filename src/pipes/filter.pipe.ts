import { Pipe, PipeTransform } from '@angular/core';
import { Events } from 'ionic-angular';

@Pipe({
  name: 'filter',
})
export class FilterBuscaPipe implements PipeTransform {

  propriedadesBusca = [
    'nome', 'sobrenome', 'endereco', 'numero', 'cpf'
  ];

  constructor(private event: Events) { }

  transform(alunos, filter): any {
      console.log(alunos);
    return alunos.filter(item => {
      return (
        item.nome.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.sobrenome.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.endereco.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.numero.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.cpf.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );
    });
  }
}
