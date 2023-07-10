import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeioPagamento } from 'src/app/Models/MeioPagamento';
import { MeioPagamentoService } from 'src/app/services/meio-pagamento.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/share/dialog.service';
import { SafeUrl } from '@angular/platform-browser';;

@Component({
  selector: 'app-meio-pagamento',
  templateUrl: './meio-pagamento.component.html',
  styleUrls: ['./meio-pagamento.component.css']
})
export class MeioPagamentoComponent {

  ngOnInit(): void {
    this.carregarMeioPag();
  }

  constructor(private meioPagService: MeioPagamentoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.CreateFormMeioPag();
  };

  public frmMeioPag!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_meio_pag = 'Cadastro Meios de Pagamento';
  public oMeioPagamentos: MeioPagamento[] = [];
  public oMeioPagamento!: MeioPagamento;
  public meioPagSelecionado!: MeioPagamento;
  public modo: string = '';
  public newMeioPag: MeioPagamento = new MeioPagamento;
  public v_qrCode: string = "";
  public v_qrCodeDownloadLink: SafeUrl = ""; // allow save without question every time
  public selected: string = "";
  // ------------------------------------------

  CreateFormMeioPag() {
    this.frmMeioPag = this.fb.group({
      //id: [''],
      nomeCliente: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      linhaDigitavel: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$"), Validators.minLength(9)]],
      tipoPagamento: ['', [Validators.required]],
      qrCode: ['']
    })
  }

  SendMeioPagamento(meioPagForm: MeioPagamento) {
    this.p_submitted = true;

    // if (this.frmMeioPag.invalid) {
    //   console.log(this.frmMeioPag.invalid)
    //   return
    // }
    //------------------------------------------
    // this.dataEntrada = moment.utc(this.frmCliente.value.dataCliente).local();

    // this.frmCliente.value.dataCliente = this.dataEntrada;

    (this.meioPagSelecionado?.id != 0) ? this.modo = 'put' : this.modo = 'post';

    if (this.modo == 'put') {

      if (typeof this.frmMeioPag.value.id === "undefined") {
        this.frmMeioPag.value.id = this.meioPagSelecionado.id;
      }

      this.frmMeioPag.value.qrCode = this.v_qrCode;

      this.atualizaMeioPag(this.frmMeioPag.value);

      this.Voltar();
    }

    if (this.selected == "" && this.modo == 'post') {
      this.toastr.error('Tipo Pagamento é obrigatório !', 'VITAL LATINA');
      return
    }

    if (this.modo == 'post') {
      this.newMeioPag = this.frmMeioPag.value;
      this.frmMeioPag.value.tipoPagamento = this.selected;

      if (this.selected == "2") {
        this.frmMeioPag.value.qrCode = meioPagForm.nomeCliente + "|" + meioPagForm.valor + "|" + meioPagForm.linhaDigitavel;
      }

      console.log(this.frmMeioPag.value);
      this.CreateNewMeioPagPrepare(this.newMeioPag);
      this.Voltar();
    }

  }

  // VERBS POST METHOD
  CreateNewMeioPagPrepare(meioPag: MeioPagamento) {
    this.meioPagService.CreateNewMeioPag(meioPag).subscribe({
      next: (newCustomer = meioPag) => {
        this.carregarMeioPag();
        this.toastr.success('Dado ADICIONADO com sucesso !', 'VITAL LATINA');
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  ResetForm(): void {
    this.frmMeioPag.reset();
  }

  // GET ALL METHOD
  carregarMeioPag(): void {
    this.meioPagService.GetAllMeioPag().subscribe({
      next: (meioPag: MeioPagamento[]) => {
        this.oMeioPagamentos = meioPag;
      },
      error: (err) => {
        console.log('somethings wrong occurred: ' + err);
      }
    });
  }

  meioPagNovo() {
    this.meioPagSelecionado = new MeioPagamento();
    this.frmMeioPag.patchValue(this.meioPagSelecionado);
    this.frmMeioPag.reset();
    this.v_qrCode = "";
  }

  meioPagSelect(meioPag: MeioPagamento) {
    this.meioPagSelecionado = meioPag;
    this.frmMeioPag.patchValue(meioPag);
    this.v_qrCode = meioPag.id + "|" + meioPag.nomeCliente + "|" + meioPag.valor + "|" + meioPag.linhaDigitavel;
  }

  meioPagExcluir(meioPagForm: MeioPagamento) {
    this.dialogService.confirmDialog({
      title: 'EXCLUSÃO DE DADOS',
      message: `Confirma a exclusão do Boleto: ${meioPagForm.id} Razão: ${meioPagForm.nomeCliente}?`,
      confirmText: 'Sim',
      cancelText: 'Não',
    },).subscribe(res => {
      if (res) {
        this.meioPagService.RemoveMeioPag(meioPagForm.id).subscribe({
          next: () => {
            this.toastr.warning('Registro EXCLUÍDO com sucesso !', 'VITAL LATINA');
            this.carregarMeioPag();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

    })
  }//end method

  Voltar() {
    this.meioPagSelecionado = this.oMeioPagamento;
  }

  LimpaMeioPagForms() {
    this.frmMeioPag.reset(new MeioPagamento());
  }

  atualizaMeioPag(meioPagUpd: MeioPagamento) {
    this.meioPagService.UpdateMeioPag(meioPagUpd.id, meioPagUpd).subscribe({
      next: (meioPag: MeioPagamento) => {
        console.log(meioPag);
        this.toastr.success('Dado ATUALIZADO com sucesso !', 'VITAL LATINA');
        this.carregarMeioPag();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeURL(url: SafeUrl) {
    this.v_qrCodeDownloadLink = url;
  }


  GerarQRCode(frmMeioPag: MeioPagamento) {
    let valorgerado: string = "";
    valorgerado = frmMeioPag.id + "|" + frmMeioPag.nomeCliente + "|" + frmMeioPag.valor + frmMeioPag.linhaDigitavel;
    console.log(valorgerado);
    this.v_qrCode = valorgerado;
  }

  ObtemDigitavelQRCode(): string {
    return this.v_qrCode;
  }
}
