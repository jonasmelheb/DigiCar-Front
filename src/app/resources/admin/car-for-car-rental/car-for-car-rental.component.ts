import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/common/interfaces/car.model';
import { CarForCarRentalService } from 'src/app/common/services/car-for-car-rental.service';
import { DetailCarForCarrentalComponent } from './detail-car-for-carrental/detail-car-for-carrental.component';


@Component({
  selector: 'app-car-for-car-rental',
  templateUrl: './car-for-car-rental.component.html',
  styleUrls: ['./car-for-car-rental.component.css']
})
export class CarForCarRentalComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Car>();
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

  openDialogDetail(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id
    };
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(DetailCarForCarrentalComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(id => {
      if (id != undefined) {
        this.dataSource.data = this.dataSource.data.filter((carForCarRental, key)=> carForCarRental.id !== id);
      }
    });
  }
}
