import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-hk-header',
  templateUrl: './hk-header.component.html',
  styleUrls: ['./hk-header.component.scss']
})
export class HkHeaderComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor() { }

  ngOnInit() {
  }

}
