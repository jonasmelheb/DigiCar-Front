
import { CarrentalService } from '../../common/services/carrental.service';
import { Carrental } from '../../common/interfaces/carrental.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/common/interfaces/user.model';
import {CarForCarRentalDetails} from "../../common/interfaces/carForCarRentalDetails.model";
import {ERole} from "../../common/interfaces/ERole";
import {LoginService} from "../../common/services/login.service";

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  carRentals?: Carrental[] = [];
  carForCarRental?: CarForCarRentalDetails[] = [];
  user?:User;

  dataSource = new MatTableDataSource<Carrental>();
  displayedColumns: string[] = [ 'dateDepart', 'dateArrivee', 'usedCar', 'actions'];
  private message!: string;

  constructor(
    private service: CarrentalService,
    public dialog: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getUserAuth()?.subscribe(
      user => {
        this.user = user;
        user.roles.map(role => {
          if (role.name === ERole.ROLE_ADMIN) {
            this.viewListCarRental();
          } else {
            this.viewListCarRentalReserved()
          }
        })
      })
  }

viewListCarRental() {
    this.service.getAllCarRentals().subscribe(
      carRentals => this.dataSource.data = carRentals,
      error => this.message = error
    )
  }

viewListCarRentalReserved() {
    this.service.getCarRentalWhereCollaborateurIsReserve().subscribe(
             reservedCarRental => this.dataSource.data = reservedCarRental,
        error => this.message = error
      );
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
