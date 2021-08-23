import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CarpoolingDetail} from "../../../common/interfaces/carpoolingDetail.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DetailCarpoolingComponent} from "../detail-carpooling/detail-carpooling.component";

@Component({
  selector: 'app-my-reserved-carpooling',
  templateUrl: './my-reserved-carpooling.component.html',
  styleUrls: ['./my-reserved-carpooling.component.css']
})
export class MyReservedCarpoolingComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CarpoolingDetail>();
  displayedColumns: string[] = [ 'addressDeparture', 'addressArrival', 'datetimeDeparture' ,'organize'];
  message!: string;

  constructor(
    private service: CarpoolingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  refreshList() {
    this.service.getReservedCarpooling().subscribe(
      resCarpooling => this.dataSource.data = resCarpooling,
      error => this.message = error
    );
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

    this.dialog.open(DetailCarpoolingComponent, dialogConfig)
  }
}
