import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<DetailCarForCarrentalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private service: CarForCarRentalService,
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
}
