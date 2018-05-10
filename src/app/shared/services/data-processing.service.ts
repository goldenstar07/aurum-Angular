import { Injectable } from '@angular/core';

@Injectable()
export class DataProcessingService {

  constructor() { }

  createArrayOfItemsbyHotelId(items){
      let hotelId = localStorage.hotelId;
      let arrayOfFilterItems = [];
      items.forEach(item => {if(item.data.hotelId === hotelId) arrayOfFilterItems.push(item)});
      return arrayOfFilterItems;
    }
  createArrayOfItemsbyHotelId2(items){
      let hotelId = localStorage.hotelId;
      let arrayOfFilterItems = [];
      items.forEach(item => {if(item.data.htId === hotelId) arrayOfFilterItems.push(item)});
      return arrayOfFilterItems;
    }


  }
