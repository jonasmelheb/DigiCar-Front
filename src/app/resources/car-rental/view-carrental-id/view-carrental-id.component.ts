import { CarrentalService } from './../../../common/services/carrental.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
  message!: string;
  id!: number;

  constructor(
    private service: CarrentalService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCarrental()
  }

  getCarrental() {
    this.id = this.route.snapshot.params['id']
    this.service.getById(this.id).subscribe(
      carrental => this.carrental = carrental,
      error => this.msgError = error
    )
  }

  updateCarrental(id: number){
    this.router.navigateByUrl('/car-rental/reserve/' + id)

  }



  deleteCarrental(id: number){
    this.service.deleteById(id).subscribe(
      () => {

        this.router.navigate(['/car-rental'])
      },
      error => this.msgError = error
    )
  }




}
