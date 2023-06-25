import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITableCliente } from 'src/app/interfaces/itable-cliente';
import { TableclienteService } from 'src/app/services/tablecliente.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  ngOnInit(): void {

  }

  public myDataSource: any;
  clientList!: ITableCliente[];
  displayedColumns: string[] = ['codigo', 'razaosocial', 'pessoacontato', 'cnpj', 'acao'];
  // myDataSource = ELEMENT_DATA;

  //set paginator
  @ViewChild(MatPaginator) mypaginator!: MatPaginator

  //set sort or ordenation
  @ViewChild(MatSort) mysort!: MatSort;

  constructor(private svTable: TableclienteService) {
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
      next: (cliente: ITableCliente[]) => {
        this.clientList = cliente;
        this.myDataSource = new MatTableDataSource<ITableCliente>(this.clientList);
        this.myDataSource.paginator = this.mypaginator;
        this.myDataSource.sort = this.mysort;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}
