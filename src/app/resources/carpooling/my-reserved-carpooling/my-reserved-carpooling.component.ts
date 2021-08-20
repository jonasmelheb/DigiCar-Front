import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CarpoolingDetail} from "../../../common/interfaces/carpoolingDetail.model";

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
  private message!: string;

  constructor(
    private service: CarpoolingService
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

}
