import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Avaliacao } from 'src/app/Models/Avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/Models/Cliente';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
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
    // formDirective.resetForm();
    // this.frmCliente.reset();
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




}
