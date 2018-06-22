import { Marker } from './markers';
import { ChangeDetectorRef } from '@angular/core';

export class DataService {
  private data: Marker[] = [
        new Marker(0,'Донецк',47.994879,37.785557,true,1528457881270),
        new Marker(1,'Черное море',42.994879,37.785557,true,1728457881270)
      ];
  private cdref: ChangeDetectorRef

GetData(): Marker[]
{
  let items = this.GetItems();
    if(!items){
      this.SetItems();
      console.log("инициализация - ", this.data);
      return this.data;
    }
    else{
      this.data = JSON.parse(items);
      console.log("инициализация - ", this.data);
       return this.data;
    }
  
  
}
AddData(lat: number, lng: number,)
{
  this.data.push(new Marker(
    this.GetNextId(),
    '',
    lat,
    lng
  ));
  this.SetItems();
  console.log("data array - ", this.data);
  
}

GetNextId():number
{
  let id = 0;
  let item = this.data.find(obj => obj.id >= id);
  while(item)
  {
    id = item.id + 1;
    item = this.data.find(obj => obj.id >= id);
  }
  return id;
}
GetDataMarker(id)
{
  console.log("Наш айди - " + id);
  return this.data[id];
}
DeleteData(id: number)
{
  this.data = this.data.slice(0,id).concat(this.data.slice(id + 1, this.data.length));
  this.SetItems();
}
EditDataMarker(index: number, $event, eventName: string)
{
  if (eventName == "name") 
  {
  this.data[index].name = $event;
  }
  else if (eventName == "time")
  {
    this.data[index].time = $event;
    this.cdref.detectChanges();
  }
  else if (eventName == "lat")
  {
    this.data[index].coordslat = $event.coords.lat;
  }  
  else if (eventName == "lng")
  {
    this.data[index].coordslng = $event.coords.lng;
  }
 else console.log("Проблема с eventName");
}

GetItems()
{
  return localStorage.getItem("markers");
}
SetItems()
{
  let str = JSON.stringify(this.data);
  localStorage.setItem("markers",str);
}

}