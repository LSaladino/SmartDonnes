import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pix } from 'src/app/Models/Pix';
import { PixService } from 'src/app/services/pix.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/share/dialog.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {

  ngOnInit(): void {
    this.carregarPix();
  }

  constructor(private pixService: PixService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.CreateFormPix();
  };

  public frmPix!: FormGroup;
  public p_submitted!: boolean;
  public p_titulo_pix = 'Cadastro de Pix';
  public oPixes: Pix[] = [];
  public oPix!: Pix;
  public pixSelecionado!: Pix;
  public modo: string = '';
  public newPix: Pix = new Pix;
  public v_qrCode: string = "";
  public v_qrCodeDownloadLink: SafeUrl = ""; // allow save without question every time
  // ------------------------------------------

  CreateFormPix() {
    this.frmPix = this.fb.group({
      //id: [''],
      nomeCliente: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // linhaDigitavel: ['', [Validators.maxLength(48), Validators.pattern("^[0-9]*$"), Validators.minLength(47)]],
      qrCode: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$"), Validators.minLength(9)]]
    })
  }

  SendPix() {
    this.p_submitted = true;

    if (this.frmPix.invalid) {
      return
    }
    //------------------------------------------
    // this.dataEntrada = moment.utc(this.frmCliente.value.dataCliente).local();

    // this.frmCliente.value.dataCliente = this.dataEntrada;

    (this.pixSelecionado?.id != 0) ? this.modo = 'put' : this.modo = 'post';

    if (this.modo == 'put') {

      if (typeof this.frmPix.value.id === "undefined") {
        this.frmPix.value.id = this.pixSelecionado.id;
      }

      this.atualizaPix(this.frmPix.value);

      this.Voltar();
    }

    if (this.modo == 'post') {
      this.newPix = this.frmPix.value;
      console.log(this.frmPix.value);
      this.CreateNewPixPrepare(this.newPix);
      this.Voltar();
    }

  }

  // VERBS POST METHOD
  CreateNewPixPrepare(pix: Pix) {
    this.pixService.CreateNewPix(pix).subscribe({
      next: (newCustomer = pix) => {
        this.carregarPix();
        this.toastr.success('Dado ADICIONADO com sucesso !', 'VITAL LATINA');
      },
      error: (err) => {
        console.log('Found errors: ' + err);
      }
    })
  }

  ResetForm(): void {
    this.frmPix.reset();
  }

  // GET ALL METHOD
  carregarPix(): void {
    this.pixService.GetAllPix().subscribe({
      next: (pix: Pix[]) => {
        this.oPixes = pix;
      },
      error: (err) => {
        console.log('somethings wrong occurred: ' + err);
      }
    });
  }

  pixNovo() {
    this.pixSelecionado = new Pix();
    this.frmPix.patchValue(this.pixSelecionado);
    this.frmPix.reset();
    this.v_qrCode = "";
  }

  pixSelect(pix: Pix) {
    this.pixSelecionado = pix;
    this.frmPix.patchValue(pix);
    this.v_qrCode = pix.id + ";" + pix.nomeCliente + ";" + pix.valor;
  }

  pixExcluir(pixForm: Pix) {
    this.dialogService.confirmDialog({
      title: 'EXCLUSÃO DE DADOS',
      message: `Confirma a exclusão do Boleto: ${pixForm.id} Razão: ${pixForm.nomeCliente}?`,
      confirmText: 'Sim',
      cancelText: 'Não',
    },).subscribe(res => {
      if (res) {
        this.pixService.RemovePix(pixForm.id).subscribe({
          next: () => {
            this.toastr.error('Registro EXCLUÍDO com sucesso !', 'VITAL LATINA');
            this.carregarPix();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

    })
  }//end method

  Voltar() {
    this.pixSelecionado = this.oPix;
  }

  LimpaPixForms() {
    this.frmPix.reset(new Pix());
  }

  atualizaPix(pixUpd: Pix) {
    this.pixService.UpdatePix(pixUpd.id, pixUpd).subscribe({
      next: (pix: Pix) => {
        console.log(pix);
        this.toastr.success('Dado ATUALIZADO com sucesso !', 'VITAL LATINA');
        this.carregarPix();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeURL(url: SafeUrl) {
    this.v_qrCodeDownloadLink = url;
  }

}