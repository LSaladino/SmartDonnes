import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boleto } from 'src/app/Models/Boleto';
import { BoletoService } from 'src/app/services/boleto.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/share/dialog.service';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent implements OnInit {

  ngOnInit(): void {
    this.carregarBoletos();
  }

  constructor(private boletoService: BoletoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.CreateFormBoleto();
  };

  public frmBoleto!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_boleto = 'Cadastro de Boletos';
  public oBoletos: Boleto[] = [];
  public oBoleto!: Boleto;
  public boletoSelecionado!: Boleto;
  public modo: string = '';
  public newBoleto: Boleto = new Boleto;
  // ------------------------------------------

  CreateFormBoleto() {
    this.frmBoleto = this.fb.group({
      //id: [''],
      nomeCliente: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // linhaDigitavel: ['', [Validators.maxLength(48), Validators.pattern("^[0-9]*$"), Validators.minLength(47)]],
      linhaDigitavel: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$"), Validators.minLength(9)]]
    })
  }

  SendBoleto() {
    this.p_submitted = true;

    if (this.frmBoleto.invalid) {
      return
    }
    //------------------------------------------
    // this.dataEntrada = moment.utc(this.frmCliente.value.dataCliente).local();

    // this.frmCliente.value.dataCliente = this.dataEntrada;

    (this.boletoSelecionado?.id != 0) ? this.modo = 'put' : this.modo = 'post';

    if (this.modo == 'put') {

      if (typeof this.frmBoleto.value.id === "undefined") {
        this.frmBoleto.value.id = this.boletoSelecionado.id;
      }

      this.atualizaBoleto(this.frmBoleto.value);
      
      this.Voltar();
    }

    if (this.modo == 'post') {
      this.newBoleto = this.frmBoleto.value;
      this.CreateNewBoletoPrepare(this.newBoleto);
      this.Voltar();
    }

  }

  // VERBS POST METHOD
  CreateNewBoletoPrepare(boleto: Boleto) {
    this.boletoService.CreateNewBoleto(boleto).subscribe({
      next: (newCustomer = boleto) => {
        this.carregarBoletos();
        this.toastr.success('Dado ADICIONADO com sucesso !', 'VITAL LATINA');
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  ResetForm(): void {
    this.frmBoleto.reset();
  }

  // GET ALL METHOD
  carregarBoletos(): void {
    this.boletoService.GetAllBoleto().subscribe({
      next: (boletos: Boleto[]) => {
        this.oBoletos = boletos;
      },
      error: (err) => {
        console.log('somethings wrong occurred: ' + err);
      }
    });
  }

  boletoNovo() {
    this.boletoSelecionado = new Boleto();
    this.frmBoleto.patchValue(this.boletoSelecionado);
    this.frmBoleto.reset();
  }

  boletoSelect(boleto: Boleto) {
    this.boletoSelecionado = boleto;
    this.frmBoleto.patchValue(boleto);
  }

  boletoExcluir(boletoForm: Boleto) {
    this.dialogService.confirmDialog({
      title: 'EXCLUSÃO DE DADOS',
      message: `Confirma a exclusão do Boleto: ${boletoForm.id} Razão: ${boletoForm.nomeCliente}?`,
      confirmText: 'Sim',
      cancelText: 'Não',
    },).subscribe(res => {
      if (res) {
        this.boletoService.RemoveBoleto(boletoForm.id).subscribe({
          next: () => {
            this.toastr.error('Registro EXCLUÍDO com sucesso !', 'VITAL LATINA');
            this.carregarBoletos();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

    })
  }//end method

  Voltar() {
    this.boletoSelecionado = this.oBoleto;
  }

  LimpaBoletoForms() {
    this.frmBoleto.reset(new Boleto());
  }

  atualizaBoleto(boletoUpd: Boleto) {
    this.boletoService.UpdateBoleto(boletoUpd.id, boletoUpd).subscribe({
      next: (boleto: Boleto) => {
        console.log(boleto);
        this.toastr.success('Dado ATUALIZADO com sucesso !', 'VITAL LATINA');
        this.carregarBoletos();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
