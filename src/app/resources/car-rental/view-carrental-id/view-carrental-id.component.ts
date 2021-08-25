import { Component, OnInit } from '@angular/core';
import { CarrentalService } from "../../../common/services/carrental.service";
import { Router } from "@angular/router";
import { Carrental} from "../../../common/interfaces/carrental.model"
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-view-carrental-id',
  templateUrl: './view-carrental-id.component.html',
  styleUrls: ['./view-carrental-id.component.css']
})
export class ViewCarrentalIdComponent implements OnInit {

  carrental?: Carrental;
  msgError?: string;

  dataSource = new MatTableDataSource<Carrental>();
  displayedColumns: string[] = ['dateDepart', 'dateArrivee', 'driver','modifier','supprimer'];
  private message!: string;



  constructor(private service: CarrentalService, private router: Router, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.getCarrental()
  }

  getCarrental() {
    this.service.getById(1).subscribe(
      carrental => this.carrental = carrental,
      error => this.msgError = error
    )
  }

  updateCarrental(id: number){
    console.log("modifier");
    this.service.updateById(1).subscribe(
      () => {

        this.router.navigate(['/carpooling'])
      },
      error => this.msgError = error
    )

  }

  deleteCarrental(id: number){
    console.log("supprimer");
    this.service.deleteById(id).subscribe(
      () => {

        this.router.navigate(['/carpooling'])
      },
      error => this.msgError = error
    )
  }




}
