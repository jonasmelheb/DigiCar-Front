import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarForCarRental } from 'src/app/common/interfaces/carForCarRental.model';
import { CarForCarRentalService } from 'src/app/common/services/car-for-car-rental.service';


@Component({
  selector: 'app-car-for-car-rental',
  templateUrl: './car-for-car-rental.component.html',
  styleUrls: ['./car-for-car-rental.component.css']
})
export class CarForCarRentalComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CarForCarRental>();
  displayedColumns: string[] = [ 'mark', 'model', 'placeNumber' , 'registration' , 'status' , 'category' , 'actions'];
  message!: string;

  constructor(
    private service: CarForCarRentalService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  refreshList() {
    this.service.getCarForCarRental().subscribe(
      cars => this.dataSource.data = cars,
      error => this.message = error
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
