import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {CarpoolingDetail} from "../../../common/interfaces/carpoolingDetail.model";
import {LoginService} from "../../../common/services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-carpooling',
  templateUrl: './detail-carpooling.component.html',
  styleUrls: ['./detail-carpooling.component.css']
})
export class DetailCarpoolingComponent implements OnInit {

  carpooling?: CarpoolingDetail;
  msgError?: string;
  disable = false;
  myCarpooling = false;
  myReservation = false;
  cancelButton = false;
  deleteButton = false;

  constructor(
    public dialogRef: MatDialogRef<DetailCarpoolingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private service: CarpoolingService,
    private loginService: LoginService,
    private router: Router
) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.service.getCarpoolingById(this.data.id).subscribe(
      carpooling => {
        this.carpooling = carpooling
        this.loginService.getUserAuth()?.subscribe(
          user => {
            if (user.username === carpooling.organize.username) {
              this.myCarpooling = true;
              this.deleteButton = true;
            }
            carpooling.reserve.forEach(userReserve => {
              if (userReserve.username === user.username) {
                this.myReservation = true;
                this.cancelButton = true;
              }
            })
          }
        )
      },
      error => this.msgError = error
    )
  }

  onClose() {
    this.dialogRef.close();
  }

  reserve(id: number) {
    this.service.reserve(id).subscribe(
      carpooling => {
        this.disable = true;
        this.dialogRef.close()
        this.router.navigate(['carpooling/reserved-carpooling'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      }
    )
  }

  cancelReservation(id: number) {
    this.service.cancel(id).subscribe(
      carpooling => {
        this.disable = true;
        this.dialogRef.close()
        this.carpooling = carpooling;
        this.router.navigate(['carpooling'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      }
    )
  }

  deleteCarpooling(id: number) {
    this.service.delete(id).pipe(
      carpooling => {
        this.disable = true
        return carpooling;
      }
    ).subscribe(
      () => {
        this.dialogRef.close(id)
        this.router.navigate(['carpooling'])
          .catch(error => {
            console.log('/connexion url no longer available. Check routing file.');
          });
      }
    )
  }
}
