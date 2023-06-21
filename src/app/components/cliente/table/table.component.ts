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

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
