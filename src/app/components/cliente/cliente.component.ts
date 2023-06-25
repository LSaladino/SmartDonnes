import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/share/dialog.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  ngOnInit(): void {
    this.carregarClientes();
  }

  constructor(private clienteService: ClienteService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.CreateFormCliente();
  };

  public frmCliente!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_cliente = 'Cadastro de Clientes';
  public dataEntrada!: moment.Moment;
  public oClientes: Cliente[] = [];
  public oCliente!: Cliente;
  public oclienteCnpj = new Cliente();
  public clienteSelecionado!: Cliente;
  public modo: string = '';
  public newCliente: Cliente = new Cliente;
  public valCnpj: string = '';
  // ------------------------------------------

  CreateFormCliente() {
    this.frmCliente = this.fb.group({
      //id: [''],
      razaoSocial: ['', [Validators.required, Validators.minLength(10)]],
      pessoaContato: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.maxLength(18)]],
      dataCliente: ['']
    })
  }

  SendClient() {
    this.p_submitted = true;

    if (this.frmCliente.invalid) {
      return
    }
    //------------------------------------------
    this.dataEntrada = moment.utc(this.frmCliente.value.dataCliente).local();
    // const currentDate = new Date();

    // const currentHour = currentDate.getHours();
    // const currentMinute = currentDate.getMinutes();
    // const currentSecond = currentDate.getSeconds();

    // this.frmCliente.value.DataCliente = this.dataEntrada.format("YYYY-MM-DD") + "T" + currentHour + ":" + currentMinute + ":" + currentSecond;
    this.frmCliente.value.dataCliente = this.dataEntrada;
    // console.log(this.frmCliente.value);

    (this.clienteSelecionado?.id != 0) ? this.modo = 'put' : this.modo = 'post';

    if (this.modo == 'put') {

      if (typeof this.frmCliente.value.id === "undefined") {
        this.frmCliente.value.id = this.clienteSelecionado.id;
      }

      this.atualizaCliente(this.frmCliente.value);
      this.toastr.success('Dado atualizado com sucesso !', 'Aviso Sistema');
      this.Voltar();
    }

    if (this.modo == 'post') {
      this.newCliente = this.frmCliente.value;
      // let cnpjSMask = this.frmCliente.value.cnpj;
      // cnpjSMask = new RegExp('0-9', cnpjSMask);
      // console.log(cnpjSMask);
      this.obterClientePorCnpj(this.frmCliente.value.cnpj);
      this.Voltar();
    }

    // this.CreateNewClientPrepare(this.frmCliente.value);
    // this.obterClientePorCnpj(this.frmCliente.value.Cnpj);

    // this.ResetForm();
  }

  // VERBS POST METHOD
  CreateNewClientPrepare(cliente: Cliente) {
    this.clienteService.CreateNewClient(cliente).subscribe({
      next: (newCustomer = cliente) => {
        // console.log('Novo Cliente: ' + newCustomer);
        // this.toastr.success("Cadastro realizado com sucesso !", "Aviso do Sistema");
        this.carregarClientes();
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
          this.toastr.error("CNPJ já está em uso !", "Aviso do Sistema");
        }
      },
      error: (err) => {
        if (err) {
          this.CreateNewClientPrepare(this.frmCliente.value);
          this.toastr.success('Dado gravado com sucesso !', 'Aviso do Sistema');
          this.carregarClientes();
          this.ResetForm();
        }

      }
    });
  }

  clienteNovo() {
    this.clienteSelecionado = new Cliente();
    this.frmCliente.patchValue(this.clienteSelecionado);
  }

  clienteSelect(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.frmCliente.patchValue(cliente);
  }

  clienteExcluir(clienteForm: Cliente) {
    this.dialogService.confirmDialog({
      title: 'EXCLUSÃO DE DADOS',
      message: `Confirma a exclusão do Cnpj: ${clienteForm.cnpj} Razão: ${clienteForm.razaoSocial}?`,
      confirmText: 'Sim',
      cancelText: 'Não',
    },).subscribe(res => {
      if (res) {
        this.clienteService.RemoveClient(clienteForm.id).subscribe({
          next: () => {
            this.toastr.info('Registro excluído com sucesso !', 'EXCLUSÃO DE DADOS');
            this.carregarClientes();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

    })
  }//end method

  Voltar() {
    this.clienteSelecionado = this.oCliente;
  }

  LimpaClienteForms() {
    this.frmCliente.reset(new Cliente());
  }

  atualizaCliente(clienteUpd: Cliente) {
    this.clienteService.UpdateClient(clienteUpd.id, clienteUpd).subscribe({
      next: (cliente: Cliente) => {
        console.log(cliente)
        this.carregarClientes();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // RETRIEVE TO DTO CLASS
  GetClientTwoField(bValor: boolean): void {
    this.clienteService.GetClientTwoField(bValor).subscribe({
      next: (clientes: Cliente[]) => {
        this.oClientes = clientes;
      },
      error: (err) => {
        console.log('somethings wrong occurred: ' + err);
      }
    })
  }
  // formataCNPJ(eventValue: any) {
  //   let cnpjLido = eventValue.target.value;
  //   let cnpjFormat = ("00000000000000" + cnpjLido).slice(-14);
  //   this.frmCliente.patchValue({
  //     cnpj:cnpjFormat
  //   })

  //   console.log(eventValue.target.value);
  // }



}
