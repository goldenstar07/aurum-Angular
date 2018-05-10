import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {


  constructor() { }

  public static getItemsByHotelId(arr){
    return arr.find(e => e.id == localStorage.hotelId);
  }

}
