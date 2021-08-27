import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarForCarRentalDetails } from 'src/app/common/interfaces/carForCarRentalDetails.model';
import { CarForCarRentalService } from 'src/app/common/services/car-for-car-rental.service';

@Component({
  selector: 'app-detail-car-for-carrental',
  templateUrl: './detail-car-for-carrental.component.html',
  styleUrls: ['./detail-car-for-carrental.component.css']
})
export class DetailCarForCarrentalComponent implements OnInit {

  carForCarRental?:CarForCarRentalDetails;
  msgError?: string;
  disable = false;

  constructor(
    public dialogRef: MatDialogRef<DetailCarForCarrentalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, mark: string, model: string, registration: string, image: string},
    private service: CarForCarRentalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.service.getCarForCarRentalById(this.data.id).subscribe(
      car => this.carForCarRental = car,
      error => this.msgError = error
    )
  }

  onClose() {
    this.dialogRef.close();
  }

  deleteCarForCarRental(id: number) {
    this.service.delete(id).pipe(
      carForCarRental => {
        this.disable = true
        return carForCarRental;
      }
    ).subscribe(
      () => {
        this.dialogRef.close(id)
        this.router.navigate(['car-for-carrental'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      }
    )
  }

  editCarForCarRental(id: number) {
    this.dialogRef.close();
    if (id !== null) {
      this.router.navigateByUrl(`car-for-carrental/add/${id}`)
    }
  }
}
