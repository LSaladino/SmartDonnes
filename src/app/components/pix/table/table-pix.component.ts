import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITablePix } from 'src/app/interfaces/itable-pix';
import { TablePixService } from 'src/app/services/tablepix.service';
@Component({
  selector: 'app-table',
  templateUrl: './table-pix.component.html',
  styleUrls: ['./table-pix.component.css']
})
export class TablePixComponent {

  public myDataSource: any;
  pixList!: ITablePix[];
  displayedColumns: string[] = ['codigo', 'nomeCliente', 'valor', 'qrcode', 'acao'];
  // myDataSource = ELEMENT_DATA;
  public p_titulo_list_pix: string = "Listagem Pix";

  //set paginator
  @ViewChild(MatPaginator) mypaginator!: MatPaginator

  //set sort or ordenation
  @ViewChild(MatSort) mysort!: MatSort;

  constructor(private svTable: TablePixService) {
    this.preencheTablePix();
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

  preencheTablePix(): void {
    this.svTable.getAllPix().subscribe({
      next: (pix: ITablePix[]) => {
        this.pixList = pix;
        this.myDataSource = new MatTableDataSource<ITablePix>(this.pixList);
        this.myDataSource.paginator = this.mypaginator;
        this.myDataSource.sort = this.mysort;
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

}
