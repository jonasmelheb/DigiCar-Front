import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarForCarRental } from 'src/app/common/interfaces/carForCarRental.model';
import { Category } from 'src/app/common/interfaces/category.model';
import { ECategory } from 'src/app/common/interfaces/Ecategory';
import { CarForCarRentalService } from 'src/app/common/services/car-for-car-rental.service';

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

  constructor(
    private service: CarForCarRentalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  get form() {
    return this.carForCarRentalForm;
  }

  get formControl() {
    return this.carForCarRentalForm.controls
  }

  ngOnInit(): void {
    this.carForCarRentalForm = this.formBuilder.group({
      mark: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
      placeNumber: ['', [Validators.required, Validators.max(7)]],
      registration: ['', Validators.required],
      image: ['', [Validators.required, Validators.minLength(6)]],
      status: ['', Validators.required],
      category: ['', Validators.required],
      carService: ['', Validators.required],
    })
  }

  onSubmit() {
    this.carForCarRental = this.carForCarRentalForm.value
    this.service.create(this.carForCarRental).subscribe(
      carForCarRental => {
        this.router.navigate(['/car-for-carrental'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })
  }

}
