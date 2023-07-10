import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableMeioPagamento } from 'src/app/interfaces/itable-meio-pagamento';
import { TableMeioPagService } from 'src/app/services/table-meiopag.service';
import { MeioPagamento } from 'src/app/Models/MeioPagamento';
import { MeioPagamentoService } from 'src/app/services/meio-pagamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table-meio-pagamento.component.html',
  styleUrls: ['./table-meio-pagamento.component.css']
})
export class TableMeioPagamentoComponent {

  public myDataSource: any;
  meioPagList!: ITableMeioPagamento[];
  displayedColumns: string[] = ['codigo', 'nomeCliente', 'valor', 'linhaDigitavel', 'qrcode', 'acao'];
  // myDataSource = ELEMENT_DATA;

  anotherMeioPag!: ITableMeioPagamento[];

  //set paginator
  @ViewChild(MatPaginator) mypaginator!: MatPaginator

  //set sort or ordenation
  @ViewChild(MatSort) mysort!: MatSort;

  constructor(private svTable: TableMeioPagService,
    private toastr: ToastrService) {
    this.preencheTableMeioPag();
  }

  filterChange(dtfilter: Event) {

    const datavalue = (dtfilter.target as HTMLInputElement).value;
    this.myDataSource.filter = datavalue;

  }

  getDataEdit(mydata: any) {
    console.log(mydata)
  }

  getDataDelete() {

  }

  preencheTableMeioPag(): void {
    this.svTable.getAllMeioPag().subscribe({
      next: (meiopag: ITableMeioPagamento[]) => {
        this.meioPagList = meiopag;
        this.myDataSource = new MatTableDataSource<ITableMeioPagamento>(this.meioPagList);
        this.myDataSource.paginator = this.mypaginator;
        this.myDataSource.sort = this.mysort;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  ProcessarPagamentos() {
    let assets = this.meioPagList;
    for (let index = 0; index < assets.length; index++) {
      const element = assets[index];
      console.log(element.id)

    }

  }

  // atualizaMeioPag(meioPagUpd: ITableMeioPagamento) {
  //   this.meioPagService.UpdateMeioPagProcessa(meioPagUpd.id, meioPagUpd).subscribe({
  //     next: (meioPag: ITableMeioPagamento) => {
  //       console.log(meioPag);
  //       // this.toastr.success('Dado ATUALIZADO com sucesso !', 'VITAL LATINA');
  //       this.preencheTableMeioPag();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

}