import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  constructor(private clienteService: ClienteService,
    private fb: FormBuilder) {
    this.CreateFormCliente();
  };

  public frmCliente!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_cliente = 'Cadastro de Clientes';
  public dataEntrada!: moment.Moment;
  // public dataEntrada!:Date;

  // ------------------------------------------

  CreateFormCliente() {
    this.frmCliente = this.fb.group({
      //id: [''],
      RazaoSocial: ['', [Validators.required, Validators.minLength(10)]],
      PessoaContato: ['', [Validators.required, Validators.minLength(5)]],
      Cnpj: ['', [Validators.maxLength(14)]],
      DataCliente: ['']
    })
  }

  SendClient(formData: any, formDirective: FormGroupDirective) {
    this.p_submitted = true;

    if (this.frmCliente.invalid) {
      console.log("INVALID FORMS");
      return
    }
    this.dataEntrada = moment.utc(this.frmCliente.value.DataCliente).local();
    // this.dataEntrada = moment.utc(this.frmCliente.value.DataCliente).local();
    // const currentDate = new Date();

    // const currentHour = currentDate.getHours();
    // const currentMinute = currentDate.getMinutes();
    // const currentSecond = currentDate.getSeconds();

    // this.frmCliente.value.DataCliente = this.dataEntrada.format("YYYY-MM-DD") + "T" + currentHour + ":" + currentMinute + ":" + currentSecond;
    this.frmCliente.value.DataCliente = this.dataEntrada;
    console.log(this.frmCliente.value)
    this.CreateNewClientPrepare(this.frmCliente.value);
    // formDirective.resetForm();
    // this.frmCliente.reset();
    this.ResetForm();
  }

  CreateNewClientPrepare(cliente: Cliente) {
    this.clienteService.CreateNewClient(cliente).subscribe({
      next: (newCustomer = cliente) => {
        console.log('Novo Cliente: ' + newCustomer);
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }


  ResetForm(): void {
    this.frmCliente.reset();
  }
}
