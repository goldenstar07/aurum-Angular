import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-home-page',
  templateUrl: './main-home-page.component.html',
  styleUrls: ['./main-home-page.component.scss']
})

export class MainHomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
