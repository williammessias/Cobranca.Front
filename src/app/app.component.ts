import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppService } from './app.service';
import { CalculoTotal } from './models/cobranca';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Teste prático';

  constructor(private AppService: AppService, private toastr: ToastrService) {}
  data: any;
  cobrancaForm: FormGroup;
  clienteForm: FormGroup;
  submitted = false;
  CobrancaEventValue: any = 'Calcula';
  ClienteEventValue: any = 'Busca';

  private parametrosCalculo = CalculoTotal;

  ngOnInit(): void {
    this.cobrancaForm = new FormGroup({
      Parcela: new FormControl('', [Validators.required]),
      Valor: new FormControl('', [Validators.required]),
    });

    this.clienteForm = new FormGroup({
      Id: new FormControl('', [Validators.required]),
    });
  }

  BuscaCliente() {
    this.submitted = true;

    if (
      this.clienteForm.invalid &&
      (this.clienteForm.dirty || this.clienteForm.touched)
    ) {
      return;
    }
    this.AppService.getData(this.clienteForm.value.Id).subscribe(
      (data) => {
        if (data) {
          this.data = data;
        } else {
          this.toastr.show(
            'Não foi encontrado nenhum cliente para o Id informado.'
          );
        }
      },
      (err) => {
        this.toastr.show(
          'Aconteceu algum erro. Verifique os valores e teste novamente'
        );
      }
    );

    this.submitted = false;
  }

  SimulaValorTotal() {
    this.submitted = true;

    if (
      this.cobrancaForm.invalid &&
      (this.cobrancaForm.dirty || this.cobrancaForm.touched)
    ) {
      return;
    }

    let o = Object.assign({}, this.parametrosCalculo, this.cobrancaForm.value);

    this.AppService.postData(o).subscribe(
      (data) => {
        if (data) {
          this.data = data;
        }
      },
      (err) => {
        this.toastr.show(
          'Aconteceu algum erro. Verifique os valores e teste novamente'
        );
      }
    );
    this.submitted = false;
  }
}
