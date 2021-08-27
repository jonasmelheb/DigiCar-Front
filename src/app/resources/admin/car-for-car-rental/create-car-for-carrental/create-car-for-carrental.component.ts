import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarForCarRental } from 'src/app/common/interfaces/carForCarRental.model';
import { Category } from 'src/app/common/interfaces/category.model';
import { ECategory } from 'src/app/common/interfaces/Ecategory';
import { CarForCarRentalService } from 'src/app/common/services/car-for-car-rental.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-create-car-for-carrental',
  templateUrl: './create-car-for-carrental.component.html',
  styleUrls: ['./create-car-for-carrental.component.css']
})
export class CreateCarForCarrentalComponent implements OnInit {

  carForCarRentalForm!: FormGroup;
  carForCarRental!: CarForCarRental;
  category: Category[] = [
    {name: ECategory.BERLINES_TAILLE_L},
    {name: ECategory.BERLINES_TAILLE_M},
    {name: ECategory.BERLINES_TAILLE_S},
    {name: ECategory.CITADINES_POLYVALENTES},
    {name: ECategory.COMPACTES},
    {name: ECategory.MICRO_URBAINES},
    {name: ECategory.MINI_CITADINES},
    {name: ECategory.SUV_TT_PICKUP},
  ];
  isCarService = false;
  id!: number;
  isAddMode?: boolean;

  constructor(
    private service: CarForCarRentalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get form() {
    return this.carForCarRentalForm;
  }

  get formControl() {
    return this.carForCarRentalForm.controls
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.carForCarRentalForm = this.formBuilder.group({
      mark: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
      placeNumber: ['', [Validators.required, Validators.max(7), Validators.min(1)]],
      registration: ['', [Validators.required,this.validateRegistration]],
      image: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      category: ['', Validators.required],
      carService: ['', Validators.required],
    })

    if (!this.isAddMode) {
      this.service.getCarForCarRentalById(this.id)
        .pipe(first())
        .subscribe(car => this.form.patchValue(car));
    }
  }

  createCarForCarRental(){
    this.carForCarRental = this.carForCarRentalForm.value
    this.service.create(this.carForCarRental).subscribe(
      carForCarRental => {
        this.router.navigate(['/car-for-carrental'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })
  }

  editCarForCarRental() {
    this.service.updateCarForCarRental(this.id, this.carForCarRentalForm.value).subscribe(carForCarRental => {
      this.router.navigate(['/car-for-carrental'])
        .catch(error => {
          console.log('/connexion url no longer available. Check routing file.');
        });
    })
  }

  onSubmit() {
    if (this.isAddMode) {
    this.createCarForCarRental();
    } else {
      this.editCarForCarRental();
    }
  }

  validateRegistration(formControl: FormControl): ValidationErrors|null{
    const validationOldRegistration = new RegExp("^[0-9]{1,4}[A-Z]{1,4}[0-9]{1,2}$").test(formControl.value);
    const validationNewRegistration = new RegExp("^[A-Z]{1,2}[0-9]{1,3}[A-Z]{1,2}$").test(formControl.value);
    if(validationOldRegistration || validationNewRegistration){
      return null;
    } else {
      return {registration:"Immatriculation invalide"}
    }
  }
}
