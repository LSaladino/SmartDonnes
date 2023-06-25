import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Avaliacao } from 'src/app/Models/Avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/Models/Cliente';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

import { ToastrService } from 'ngx-toastr';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css'],
  //-----------------------------------
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,

})
export class AvaliacaoComponent implements OnInit {

  constructor(private avaliacaoService: AvaliacaoService,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private toastr: ToastrService) {
  };

  public frmAvaliacao!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_avaliacao = 'Cadastro de Avaliações';
  public p_MesAno!: Date;

  frmclientes = new FormControl();
  clientesAvaliados?: Cliente[];
  oClientesMinRetorno: Cliente[] = [];;
  selectedClientes!: any;

  date = new FormControl(moment());

  CreateFormAvaliacao() {
    this.frmAvaliacao = this.fb.group({
      //id: [''],
      mesAno: [''],
      clientesAvaliados: [''],
      notaAvaliacao: ['', [Validators.required]],
      motivoAvaliacao: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  EnviarAvaliacao() {
    this.p_submitted = true;

    if (typeof this.selectedClientes === "undefined") {
      this.toastr.error("Pelo menos 01 cliente deve ser informado", "Aviso do sistema");
      return;
    }
    else {

      this.frmAvaliacao.value.clientesAvaliados = this.selectedClientes;
      // this.getMinTwoFields(false);
      
    }

    if (typeof this.date === "undefined") {
      console.log("DATA INDEFINIDA")
    } else {
      this.p_MesAno = moment().toDate();
      this.frmAvaliacao.value.mesAno = this.p_MesAno
      console.log("MES/ANO  OK")
    }

    if (this.frmAvaliacao.invalid) {
      return
    }

    console.log(this.frmAvaliacao.value);
    // this.CreateNewAvaliaPrepare(this.frmAvaliacao.value);


  }

  ResetForm(): void {
    this.frmAvaliacao.reset();
  }


  ngOnInit(): void {
    this.CreateFormAvaliacao();
    this.FillDropDownList(true);
  }

  FillDropDownList(bValor: boolean): void {
    this.clienteService.GetClientTwoField(bValor).subscribe({
      next: (listClientes: Cliente[]) => {
        this.clientesAvaliados = listClientes;
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);

    datepicker.close();
  }


  CreateNewAvaliaPrepare(avaliacao: Avaliacao) {
    this.avaliacaoService.CreateNewAval(avaliacao).subscribe({
      next: (newAval = avaliacao) => {
        console.log('Nova Avaliaçao: ' + avaliacao);
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  getMinTwoFields(bValor: boolean): void {
    this.clienteService.GetClientTwoField(bValor).subscribe({
      next: (listClientes: Cliente[]) => {
        this.oClientesMinRetorno = listClientes;
        console.log(this.oClientesMinRetorno);

        // let strJson = JSON.stringify(this.oClientesMinRetorno);
        this.frmAvaliacao.value.clientesAvaliados = this.oClientesMinRetorno;

        this.CreateNewAvaliaPrepare(this.frmAvaliacao.value);
        this.ResetForm();


      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

}
