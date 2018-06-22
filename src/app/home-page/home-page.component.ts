import { Component, OnInit } from '@angular/core';
import { Marker } from '../markers';
import { Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [DataService]
})
export class HomePageComponent implements OnInit {

  markers: Marker [] = [];
  lat = 47.994879;
  lng = 37.785557;
  itemName = "";
  zoom = 5;

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.GetMarkers();
  }

  GetMarkers()
  {
    this.markers = this.dataService.GetData();
  }

onChoseLocation(event) {
  this.dataService.SaveItem(
    new Marker(this.dataService.GetNextId(),null,event.coords.lat,event.coords.lng)
  );
}

markerDragEnd(index, $event) {
  console.log("index",index);
  console.log("event",$event);
  if($event &&  $event.coords)
  {
    this.markers[index].coordslat = $event.coords.lat;
    this.markers[index].coordslng = $event.coords.lng;
    this.dataService.SaveItem(this.markers[index]);
    this.GetMarkers();
  }
  
  //this.dataService.SetItems();
}

}
