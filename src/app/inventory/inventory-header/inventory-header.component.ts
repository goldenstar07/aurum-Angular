import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-inventory-header',
  templateUrl: './inventory-header.component.html',
  styleUrls: ['./inventory-header.component.scss']
})
export class InventoryHeaderComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  constructor() { }

  ngOnInit() {
  }

}
