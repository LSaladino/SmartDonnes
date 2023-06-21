import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Avaliacao } from 'src/app/Models/Avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/Models/Cliente';

import{MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

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

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,

})
export class AvaliacaoComponent implements OnInit {

  constructor(private avaliacaoService: AvaliacaoService,
    private fb: FormBuilder,
    private clienteService: ClienteService) {
  };

  public frmAvaliacao!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_avaliacao = 'Cadastro de Avaliações';

  toppings = new FormControl();
  toppingList?: Cliente[];
  selectedToppings: any;

  date = new FormControl(moment());



  CreateFormAvaliacao() {
    this.frmAvaliacao = this.fb.group({
      //id: [''],
      MesAno: ['', [Validators.required]],
      ClientesAvaliados: ['', [Validators.required]],
      NotaAvaliacao: ['', [Validators.required]],
      MotivoAvaliacao: ['', [Validators.required, Validators.minLength(20)]]
    })
  }

  EnviarAvaliacao() {
    this.p_submitted = true;

    if (this.frmAvaliacao.invalid) {
      console.log("INVALID FORMS");
      return
    }

    console.log(this.frmAvaliacao.value)
    this.CreateNewAvaliaPrepare(this.frmAvaliacao.value);
    this.ResetForm();
  }

  CreateNewAvaliaPrepare(avaliacao: Avaliacao) {
    this.avaliacaoService.CreateNewAval(avaliacao).subscribe({
      next: (newAval = avaliacao) => {
        console.log('Nova Avaliaçao: ' + newAval);
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  ResetForm(): void {
    this.frmAvaliacao.reset();
  }


  ngOnInit(): void {
    this.CreateFormAvaliacao();
    this.FillDropDownList();
  }

  FillDropDownList(): void {
    this.clienteService.GetAllClient().subscribe({
      next: (listClientes: Cliente[]) => {
        this.toppingList = listClientes;
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


}
