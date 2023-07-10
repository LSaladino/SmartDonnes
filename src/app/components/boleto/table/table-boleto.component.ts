import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableBoleto } from 'src/app/interfaces/itable-boleto';
import { TableBoletoService } from 'src/app/services/tableboleto.service';

@Component({
  selector: 'app-table',
  templateUrl: './table-boleto.component.html',
  styleUrls: ['./table-boleto.component.css']
})
export class TableBoletoComponent implements OnInit {

  ngOnInit(): void {

  }

  public myDataSource: any;
  boletoList!: ITableBoleto[];
  displayedColumns: string[] = ['codigo', 'nomeCliente', 'valor', 'linhaDigitavel', 'acao'];
  // myDataSource = ELEMENT_DATA;

  //set paginator
  @ViewChild(MatPaginator) mypaginator!: MatPaginator

  //set sort or ordenation
  @ViewChild(MatSort) mysort!: MatSort;

  constructor(private svTable: TableBoletoService) {
    this.preencheTableClientes();
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

  preencheTableClientes(): void {
    this.svTable.getAllUsers().subscribe({
      next: (boleto: ITableBoleto[]) => {
        this.boletoList = boleto;
        this.myDataSource = new MatTableDataSource<ITableBoleto>(this.boletoList);
        this.myDataSource.paginator = this.mypaginator;
        this.myDataSource.sort = this.mysort;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}
