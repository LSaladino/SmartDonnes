import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  constructor(private clienteService: ClienteService,
    private fb: FormBuilder,
    private toastr:ToastrService) {
    this.CreateFormCliente();
  };

  public frmCliente!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_cliente = 'Cadastro de Clientes';
  public dataEntrada!: moment.Moment;
  public oClientes: Cliente[] = [];
  public oclienteCnpj = new Cliente();

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

  SendClient() {
    this.p_submitted = true;

    if (this.frmCliente.invalid) {
      console.log("INVALID FORMS");
      return
    }
    //------------------------------------------
    this.dataEntrada = moment.utc(this.frmCliente.value.DataCliente).local();
    // const currentDate = new Date();

    // const currentHour = currentDate.getHours();
    // const currentMinute = currentDate.getMinutes();
    // const currentSecond = currentDate.getSeconds();

    // this.frmCliente.value.DataCliente = this.dataEntrada.format("YYYY-MM-DD") + "T" + currentHour + ":" + currentMinute + ":" + currentSecond;
    this.frmCliente.value.DataCliente = this.dataEntrada;
    console.log(this.frmCliente.value)

    // this.CreateNewClientPrepare(this.frmCliente.value);
    this.obterClientePorCnpj(this.frmCliente.value.Cnpj);

    // this.ResetForm();
  }

  // VERBS POST METHOD
  CreateNewClientPrepare(cliente: Cliente) {
    this.clienteService.CreateNewClient(cliente).subscribe({
      next: (newCustomer = cliente) => {
        console.log('Novo Cliente: ' + newCustomer);
        this.toastr.success("Cadastro realizado com sucesso !", "AVISO");
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  ResetForm(): void {
    this.frmCliente.reset();
  }

  // GET ALL METHOD
  carregarClientes(): void {
    this.clienteService.GetAllClient().subscribe({
      next: (clientes: Cliente[]) => {
        this.oClientes = clientes;
      },
      error: (err) => {
        console.log('somethings wrong occurred: ' + err);
      }
    });
  }

  // GET ALL METHOD
  obterClientePorCnpj(p_cnpj: string): any {
    this.clienteService.GetClientByCnpj(p_cnpj).subscribe({
      next: (clientes: Cliente) => {
        if (p_cnpj == clientes.cnpj) {
          this.oclienteCnpj = clientes;
          this.toastr.error("CNPJ JA ESTÁ EM USO !", "AVISO");
        }
      },
      error: (err) => {
        this.CreateNewClientPrepare(this.frmCliente.value);
        this.ResetForm();
      }
    });
  }

  // validaCnpjExiste(cnpj: string): void {

  //   let novocnpj = this.obterClientePorCnpj(cnpj);

  //   let cnpj_Ret = novocnpj;
  //   if (cnpj_Ret == cnpj) {
  //     console.log("CNPJ JÁ EXISTE !!!" + cnpj);
  //   }

  // }
}
