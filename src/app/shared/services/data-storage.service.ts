import {Injectable} from '@angular/core';

@Injectable()
export class DataStorageService {

  constructor() {
  }

  static get isAuthorization(): boolean {
    return !!localStorage.user;
  }

  static get isAdmin(): boolean {
    if (localStorage.user) { return JSON.parse(localStorage.user).role === 'admin'; }
    return false;
  }

  setHotelId(id) {
    localStorage.hotelId = id;
  }

  setHotelName(hotelName){
    localStorage.hotelName = hotelName;
  }

  getHotelName(){
    return localStorage.hotelName;
  }
  
  getIsHotel(){
    return localStorage.isHotel;
  }

  setIsHotel(yn){
    localStorage.isHotel = yn;
  }
  setUser(user): void {
    localStorage.user = JSON.stringify(user);
  }

  getUser() {
    return JSON.parse(localStorage.user);
  }

  removeDataFromLocalStorage() {
    localStorage.clear();
  }
  
  
}

