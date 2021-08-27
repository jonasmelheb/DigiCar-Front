import { ActivatedRoute } from '@angular/router';
import { CarrentalService } from './../../../common/services/carrental.service';
import { CarRentalRequest } from './../../../common/interfaces/carRentalRequest.model';
import { CarForCarRentalService } from './../../../common/services/car-for-car-rental.service';
import { CarForCarRental } from './../../../common/interfaces/carForCarRental.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";


@Component({
  selector: 'app-create-carrental',
  templateUrl: './create-carrental.component.html',
  styleUrls: ['./create-carrental.component.css']
})
export class CreateCarrentalComponent implements OnInit {

  carRentalForm!: FormGroup;
  carRental!: CarRentalRequest;
  carForCarRental!:CarForCarRental[];
  message!: string;
  carId!: number;
  id!: number;
  isAddMode?: boolean;

  constructor(
    private service: CarrentalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private serviceCarForCarRental: CarForCarRentalService,
    private route: ActivatedRoute
  ) { }

  get form() {
    return this.carRentalForm;
  }

  get formControl() {
    return this.carRentalForm.controls
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.carRentalForm = this.formBuilder.group({
      dateDepart: ['', [Validators.required, this.dateLessThanNow]],
      dateArrivee: ['', Validators.required],
      usedCar: ['', Validators.required]
    }, { validator: this.dateLessThan('dateDepart', 'dateArrivee') })

    if (!this.isAddMode) {
      this.service.getById(this.id).subscribe(
        carrental => this.form.patchValue(carrental)
      )
    }

    this.viewListCarForCarRental()
  }

  onSubmit() {

    if (this.isAddMode) {
      this.createCarRental()
    }
    else {
      this.editCarrental()
    }

  }

  viewListCarForCarRental() {
    this.serviceCarForCarRental.getCarForCarRental().subscribe(
      carForCarRental => this.carForCarRental = carForCarRental
      ,
      error => this.message = error
   )
  }


  dateLessThan(dateDepart: string, dateArrivee: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls.dateDepart;
      let t = group.controls.dateArrivee;
      if (f.value > t.value) {
        return {
          dates: "La date de retour ne doit pas être antérieure à la date d'arrivée"
        };
      }
      return {};
    }
  }

  dateLessThanNow(control: FormControl): ValidationErrors | null{
    let f = control.value;
    if (f < new Date().toISOString()) {
      return {
        dates: "La date ne doit pas être antérieure à la date d'aujourd'hui"
      };
    }
    return null;
  }

  createCarRental() {
    this.carRental = {
      dateArrivee: this.carRentalForm.controls.dateArrivee.value,
      dateDepart: this.carRentalForm.controls.dateDepart.value,
    }
    this.carId = this.carRentalForm.controls.usedCar.value
    console.log(this.carId);

    this.service.create(this.carRental, this.carId).subscribe(
      carRental => {
        this.router.navigate(['/car-rental'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })


  }

  editCarrental() {
    let carRentalUpdate = {
      dateDepart: this.carRentalForm.controls.dateDepart.value,
      dateArrivee: this.carRentalForm.controls.dateArrivee.value
    }

    this.service.updateById(this.id, carRentalUpdate).subscribe(carRental => {
      this.router.navigate(['/car-rental'])
        .catch(error => {
          console.log('/connexion url no longer available. Check routing file.');
        });
    })

  }

}
