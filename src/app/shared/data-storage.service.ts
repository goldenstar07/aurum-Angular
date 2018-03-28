import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private authService: AuthService) {
  }


  getData(){
    const token = this.authService.getToken();
  }


}

