import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/common/interfaces/car.model';
import { Category } from 'src/app/common/interfaces/category.model';
import { ECategory } from 'src/app/common/interfaces/Ecategory';
import { CarService } from 'src/app/common/services/car.service';

@Component({
  selector: 'app-create-car-for-carpooling',
  templateUrl: './create-car-for-carpooling.component.html',
  styleUrls: ['./create-car-for-carpooling.component.css']
})
export class CreateCarForCarpoolingComponent implements OnInit {

  carForm!: FormGroup;
  car!: Car;
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
  id!: number;
  isAddMode?: boolean;

  constructor(
    private service: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get form() {
    return this.carForm;
  }

  get formControl() {
    return this.carForm.controls
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.carForm = this.formBuilder.group({
      mark: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', Validators.required],
      placeNumber: ['', [Validators.required, Validators.max(7), Validators.min(1)]],
      registration: ['', [Validators.required,this.validateRegistration]],
      image: ['', [Validators.required, Validators.minLength(6)]],
      status: 'ok',
      category: ['', Validators.required],
    })

    if (!this.isAddMode) {
      this.service.getCarById(this.id)
        .pipe(first())
        .subscribe(car => this.form.patchValue(car));
    }
  }

  createCar(){
    this.car = this.carForm.value
    this.service.create(this.car).subscribe(
      car => {
        this.router.navigate(['/carpooling'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })
  }

  editCar() {
    this.service.updateCar(this.id, this.carForm.value).subscribe(car => {
      this.router.navigate(['/carpooling'])
        .catch(error => {
          console.log('/connexion url no longer available. Check routing file.');
        });
    })
  }

  onSubmit(){
    if (this.isAddMode) {
      this.createCar();
      } else {
        this.editCar();
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
