import { Component, OnInit} from '@angular/core';
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
export class MarkerItemComponent implements OnInit {
  onemarker: Marker;
  id: number;
  dialogResult: string;
  
  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute, 
    public dialog: MatDialog,
    )
    {
      this.id = activateRoute.snapshot.params['id'];
      
    }


ngOnInit() 
{
  this.onemarker = this.dataService.GetDataMarker(this.id);  
  console.log("Наш маркер -  ", this.onemarker);
  
}
  
ChangeItem($event,eventName)
{
  this.dataService.EditDataMarker(this.id, $event, eventName);
 
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
  this.dataService.SetItems();

}
}
