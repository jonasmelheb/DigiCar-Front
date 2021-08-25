import {Component, OnInit} from '@angular/core';
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Carpooling} from "../../../common/interfaces/carpooling.model";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-create-carpooling',
  templateUrl: './create-carpooling.component.html',
  styleUrls: ['./create-carpooling.component.css']
})
export class CreateCarpoolingComponent implements OnInit {

  carpoolingForm!: FormGroup;
  carpooling!: Carpooling;
  id!: number;
  isAddMode?: boolean;

  constructor(
    private service: CarpoolingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  get form() {
    return this.carpoolingForm;
  }

  get formControl() {
    return this.carpoolingForm.controls
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.carpoolingForm = this.formBuilder.group({
      datetimeDeparture: ['', [Validators.required, this.dateLessThan]],
      addressDeparture: ['', [Validators.required, Validators.minLength(3)]],
      addressArrival: ['', [Validators.required, Validators.minLength(3)]],
    })

    if (!this.isAddMode) {
      this.service.getCarpoolingById(this.id)
        .pipe(first())
        .subscribe(carpool => this.form.patchValue(carpool));
    }
  }

  dateLessThan(control: FormControl): ValidationErrors | null{
    let f = control.value;
    if (f < new Date().toISOString()) {
      return {
        dates: "La date doit être antérieure à la date d'aujourd'hui"
      };
    }
    return null;
  }

  createCarpooling() {
    this.carpooling = this.carpoolingForm.value
    this.service.create(this.carpooling).subscribe(
      carppoling => {
        this.router.navigate(['/carpooling'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })
  }

  editCarpooling() {
    this.service.updateCarpooling(this.id, this.carpoolingForm.value).subscribe(carppoling => {
      this.router.navigate(['/carpooling'])
        .catch(error => {
          console.log('/connexion url no longer available. Check routing file.');
        });
    })
  }

  onSubmit() {
    if (this.isAddMode) {
      this.createCarpooling();
    } else {
      this.editCarpooling();
    }
  }
}
