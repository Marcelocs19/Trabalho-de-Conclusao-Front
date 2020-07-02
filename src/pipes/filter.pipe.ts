import { Pipe, PipeTransform } from '@angular/core';
import { Events } from 'ionic-angular';

@Pipe({
  name: 'filter',
})
export class FilterBuscaPipe implements PipeTransform {

  propriedadesBusca = [
    'nome', 'sobrenome', 'endereco', 'numero', 'cpf', 'bairro'
  ];

  constructor(private event: Events) { }

  transform(alunos, filter): any {
      console.log(alunos);
      if (alunos) {
        console.log('a')
        return alunos.filter(item => {
          return (
            item.nome.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
            item.sobrenome.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
            item.endereco.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
            item.numero.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
            item.cpf.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
            item.bairro.toLowerCase().indexOf(filter.toLowerCase()) !== -1 
          );
        });
      } else {
        console.log('b')
      }
    
  }
}
