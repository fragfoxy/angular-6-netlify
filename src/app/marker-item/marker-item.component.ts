import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Marker } from "../markers";
import { element } from 'protractor';

@Component({
  selector: 'app-marker-item',
  templateUrl: './marker-item.component.html',
  styleUrls: ['./marker-item.component.css']
})
export class MarkerItemComponent implements OnInit {
  markers: Marker[] = [];
  onemarker: Marker;
  id: number;
  index: number;
  
  constructor(private activateRoute: ActivatedRoute){
 
      this.id = activateRoute.snapshot.params['id'];
      console.log("marker id - " + this.id);
      
     
  }

/* LOCALSTORAGE BLOCK */
GetItems()
{
  return localStorage.getItem("markers");
}

SetItems()
{
  let str = JSON.stringify(this.markers);
  localStorage.setItem("markers",str);
}
/* LOCALSTORAGE BLOCK */

ngOnInit() 
{
  let items = this.GetItems();
  this.markers = JSON.parse(items)
  this.index = this.markers.findIndex(element => element.id == this.id);
  this.onemarker = this.markers[this.index]
  console.log(this.onemarker);
  
  // this.CatchMarker();
}
  
ChangeItem($event,eventName)
{
 if (eventName == "name") {
  this.markers[this.index].name = $event;
 }
 else if (eventName == "time"){
  this.markers[this.index].time = $event;
 }
}

SaveItem()
{
  this.SetItems();
}
// findNumber(element) {
// console.log(element.id,this.id);

//   return (element.id) == this.id;

// }

// CatchMarker()
// {
//   for (let item of this.markers) 
//   {
//     if (item.id == this.id)
//     {
//       this.onemarker = this.markers[this.id];
//       console.log(this.onemarker);
//     }      
//   }
// }

DeleteItem()
{
 
  this.markers = this.markers.slice(0,this.index).concat(this.markers.slice(this.index + 1, this.markers.length));
  this.SetItems();
}
}
