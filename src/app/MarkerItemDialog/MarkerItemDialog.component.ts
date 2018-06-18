import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MarkerItemComponent } from '../marker-item/marker-item.component';
@Component({
  selector: 'app-MarkerItemDialog',
  templateUrl: './MarkerItemDialog.component.html',
  styleUrls: ['./MarkerItemDialog.component.css']
})
export class MarkerItemDialogComponent implements OnInit {

  constructor(    
    public dialogRef: 
    MatDialogRef<MarkerItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
