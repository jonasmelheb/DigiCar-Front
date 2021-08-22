import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Carpooling} from "../../common/interfaces/carpooling.model";
import {CarpoolingService} from "../../common/services/carpooling.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {MatSort} from '@angular/material/sort';
import {DetailCarpoolingComponent} from "./detail-carpooling/detail-carpooling.component";
import {CarpoolingDetail} from "../../common/interfaces/carpoolingDetail.model";

@Component({
  selector: 'app-carpooling',
  templateUrl: './carpooling.component.html',
  styleUrls: ['./carpooling.component.css']
})
export class CarpoolingComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CarpoolingDetail>();
  displayedColumns: string[] = [ 'addressDeparture', 'addressArrival', 'datetimeDeparture' ,'actions'];
  private message!: string;

  constructor(
    private service: CarpoolingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  refreshList() {
    this.service.getAllCarpoolings().subscribe(
      carpoolings => this.dataSource.data = carpoolings,
      error => this.message = error
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDetail(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id
    };
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(DetailCarpoolingComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(id => {
      console.log(id)
      if (id != undefined) {
        this.dataSource.data = this.dataSource.data.filter((carpooling,key)=> carpooling.id !== id);
      }
    });
  }
}
