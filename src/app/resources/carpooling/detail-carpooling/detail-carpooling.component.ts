import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CarpoolingService} from "../../../common/services/carpooling.service";
import {CarpoolingDetail} from "../../../common/interfaces/carpoolingDetail.model";

@Component({
  selector: 'app-detail-carpooling',
  templateUrl: './detail-carpooling.component.html',
  styleUrls: ['./detail-carpooling.component.css']
})
export class DetailCarpoolingComponent implements OnInit {

  carpooling?: CarpoolingDetail;
  msgError?: string;

  constructor(
    public dialogRef: MatDialogRef<DetailCarpoolingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private service: CarpoolingService,
) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh() {
    this.service.getCarpoolingById(this.data.id).subscribe(
      carpooling => this.carpooling = carpooling,
      error => this.msgError = error
    )
  }

  onClose() {
    this.dialogRef.close();
  }
}
