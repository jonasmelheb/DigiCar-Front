import {Component, OnInit} from '@angular/core';
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Carpooling} from "../../../common/interfaces/carpooling.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-carpooling',
  templateUrl: './create-carpooling.component.html',
  styleUrls: ['./create-carpooling.component.css']
})
export class CreateCarpoolingComponent implements OnInit {

  carpoolingForm!: FormGroup;
  carpooling!: Carpooling;

  constructor(
    private service: CarpoolingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  get form() {
    return this.carpoolingForm;
  }

  get formControl() {
    return this.carpoolingForm.controls
  }

  ngOnInit(): void {
    this.carpoolingForm = this.formBuilder.group({
      datetimeDeparture: ['', Validators.required],
      addressDeparture: ['', Validators.required],
      addressArrival: ['', Validators.required]
    })
  }

  onSubmit() {
    this.carpooling = this.carpoolingForm.value
    this.service.create(this.carpooling).subscribe(
      carppoling => {
        this.router.navigate(['/home'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      })

  }
}
