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
    this.markers = this.dataService.GetData();
  }

onChoseLocation(event) {
  this.dataService.AddData(event.coords.lat, event.coords.lng)
}

markerDragEnd(index, $event) {
  this.dataService.EditDataMarker(index, $event, this.itemName ="lat");
  this.dataService.EditDataMarker(index, $event, this.itemName ="lng");
  this.dataService.SetItems();
}

}
