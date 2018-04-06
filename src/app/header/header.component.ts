import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {DataStorageService} from "../shared/services/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.isAdmin = DataStorageService.isAdmin;
  }

  onLogout() {
    this.authService.logout();
    this.dataStorageService.removeDataFromLocalStorage();
  }
}
