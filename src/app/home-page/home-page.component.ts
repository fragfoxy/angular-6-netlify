import { Component, OnInit } from '@angular/core';
import { Marker } from '../markers';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  // Class Marker
  markers: Marker [] = [];
  labelMarker = '';
  lat = 47.994879;
  lng = 37.785557;
  zoom = 5;
  addid = this.markers.length;

  ngOnInit(): void {
    let items = this.GetItems();
    if(!items){
      this.markers = [
        new Marker(0,'Донецк',47.994879,37.785557,true,1528457881270),
        new Marker(1,'Черное море',42.994879,37.785557,true,1728457881270)
      ];
      this.SetItems();
    }
    else{
      this.markers = JSON.parse(items);
    }
  }
// TODO: ПЕРЕНЕСТИ В СЕРВИС
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
onChoseLocation(event) {
  this.lat = event.coords.lat;
  this.lng = event.coords.lng;
  this.markers.push(new Marker(
    this.GetNextId(),
    '',
    this.lat,
    this.lng
  ));
  this.SetItems();
}

GetNextId():number
{
  let id = 0;
  let item = this.markers.find(obj => obj.id >= id);
  while(item)
  {
    id = item.id + 1;
    item = this.markers.find(obj => obj.id >= id);
  }
  // for (let item of this.markers)
  // {
  //   if(item.id >= id)
  //     id = item.id + 1;
  // }

  return id;
}

clickedMarker(item:Marker) {
  console.log(item);
}

markerDragEnd(item: Marker, $event) {
  console.log('DragEnd ', item, $event);
  item.coordslat = $event.coords.lat;
  item.coordslng = $event.coords.lng;
  this.SetItems();
  
 
}


}
