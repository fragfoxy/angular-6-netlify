import { Marker } from './markers';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

export class DataService {
  private data: Marker[] = [];

  public OnItemChanges: Subject<boolean> = new Subject<boolean>();



  constructor(){
    this.data = this.GetData();

    this.OnItemChanges.next(true);
    this.OnItemChanges.subscribe(
      (val:boolean) => {
        if(val){
          let str = this.GetItems();
          if(str){
            this.data = JSON.parse(str);
          }
        }
      }
    );
  }
  
  GetBaseData()
  {
    return [
      new Marker(0,'Донецк',47.994879,37.785557,true),
      new Marker(1,'Черное море',42.994879,37.785557,true)
    ];
  }

GetData(): Marker[]
{
  let items = this.GetItems();
    if(!items){
      this.data = this.GetBaseData();
      this.SetItems();
      console.log("инициализация - ", this.data);
    }
    else{
      this.data = JSON.parse(items);
      console.log("инициализация - ", this.data);
    }
  
    return this.data;
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
  return this.data.find(obj => obj.id == id);
}
DeleteData(id: number)
{
  let index = this.data.findIndex(obj => obj.id == id);
  if(index > -1){
    this.data.splice(index,1);
    this.SetItems();
  }
}

SaveItem(input : Marker)
{
  let index = this.data.findIndex(obj => obj.id == input.id);
  if(index > -1)
  {
    this.data[index] = input;
  }
  else{
    this.data.push(input);
  }
  
  this.SetItems();
}

GetItems()
{
  return localStorage.getItem("markers");
}
SetItems()
{
  let str = JSON.stringify(this.data);
  localStorage.setItem("markers",str);
  this.OnItemChanges.next(true);
}

}