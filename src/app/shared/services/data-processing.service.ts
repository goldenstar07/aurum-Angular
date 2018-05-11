import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";

@Injectable()
export class DataProcessingService {

  constructor(private dataStorageService: DataStorageService) { }

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
  createArrayOfAdmins(items){
      let arrayOfFilterItems = [];
      items.forEach(item => {if(item.data.role === "admin") arrayOfFilterItems.push(item)});
      return arrayOfFilterItems;
  }
  createArrayOfHotelsByAdminId(items){
      let arrayOfFilterItems = [];
      items.forEach(item => {if(item.data.adminId === this.dataStorageService.getUser().id) arrayOfFilterItems.push(item)});
      return arrayOfFilterItems;
  }

  }
