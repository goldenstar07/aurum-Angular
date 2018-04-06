import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hk-goals-data',
  templateUrl: './hk-goals-data.component.html',
  styleUrls: ['./hk-goals-data.component.scss']
})
export class HkGoalsDataComponent implements OnInit {
  closeResult: string;


  type: string;
  value: any;
  date: any;
  constructor(private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {

  }

  openNewProperty(contentNewProperty) {
    this.modalService.open(contentNewProperty).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
