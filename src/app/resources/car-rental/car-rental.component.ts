
import { CarrentalService } from './../../common/services/carrental.service';
import { Carrental } from './../../common/interfaces/carrental.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CarForCarRental } from 'src/app/common/interfaces/carForCarRental.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/common/interfaces/user.model';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  carRentals?: Carrental[] = [];
  carForCarRental?: CarForCarRental[] = [];
  user?:User;

  dataSource = new MatTableDataSource<Carrental>();
  displayedColumns: string[] = [ 'dateDepart', 'dateArrivee', 'usedCar', 'actions'];
  private message!: string;

  constructor(
    private service: CarrentalService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // if(this.loginService.isAdmin) {
    //   this.viewListCarRental()
    // } else {
    // this.viewListCarRentalReserved()
    // }
    this.viewListCarRental()
  }

viewListCarRental() {
    this.service.getAllCarRentals().subscribe(
      carRentals => this.dataSource.data = carRentals,
      error => this.message = error
    )
  }

// viewListCarRentalReserved() {
//     this.service.getCarRentalWhereCollaborateurIsReserve().subscribe(
//              reservedCarRental => this.dataSource.data = reservedCarRental,
//         error => this.message = error
//       );
//     }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
