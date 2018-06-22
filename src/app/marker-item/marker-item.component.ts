import { Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Marker } from "../markers";
import { MatDialog } from '@angular/material';
import { MarkerItemDialogComponent } from '../MarkerItemDialog/MarkerItemDialog.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-marker-item',
  templateUrl: './marker-item.component.html',
  styleUrls: ['./marker-item.component.css'],
  providers: [DataService]
})
export class MarkerItemComponent implements OnInit, AfterViewChecked {
  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    
  }
  onemarker: Marker = new Marker();
  id: number;
  dialogResult: string;
  
  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute, 
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef
    )
    {
      this.id = activateRoute.snapshot.params['id'];
      
    }


ngOnInit() 
{
  
  this.activateRoute.params.forEach((params)=>
  {
    this.id = params["id"];
    this.onemarker = this.dataService.GetDataMarker(this.id);
    console.log(this.onemarker);
})  
  
  
}
 
TestTime($event){
  let date = new Date();
  let arr = $event.split(":");
  let arr2 = arr[1].split(" ");

  let hour = (arr2[1] == "PM" ? 12:0) + (+arr[0]);
  let minute = arr2[0];

  // console.log(hour);
  date.setHours(hour);
  date.setMinutes(minute);
  this.onemarker.time = date;
}



DialogDelete(saveordelete)
{
  let diaLogRef = this.dialog.open(MarkerItemDialogComponent, {
    width: '250px',
    data: {name: this.onemarker.name, time: this.onemarker.time, saveordelete }
  });
  this.dataService.DeleteData(this.id);

}
DialogSave(saveordelete)
{
  let diaLogRef = this.dialog.open(MarkerItemDialogComponent, {
    width: '250px',
    data: {name: this.onemarker.name, time: this.onemarker.time, saveordelete }
  });
  this.dataService.SaveItem(this.onemarker);

}
}
