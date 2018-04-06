import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
// Services
import {AuthService} from '../auth/auth.service';
import {UploadFileService} from '../shared/services/upload-file.service';
import {HotelService} from "./services/hotel.service";
// Classes
import {FileUpload} from '../shared/classes/file-upload';
import {DataStorageService} from "../shared/services/data-storage.service";


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})

export class HotelsComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};

  closeResult: string;

  hotels: any;

  name: string;
  address: any;
  city: string;

  constructor(private router: Router,
              private modalService: NgbModal,
              private authService: AuthService,
              private dataStorageService: DataStorageService,
              private uploadService: UploadFileService,
              private hotelService: HotelService
  ) { }

  ngOnInit() {
    this.hotels = this.hotelService.getHotels();
  }

  openNewHotel(contentNewHotel) {
    this.modalService.open(contentNewHotel).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  addNewHotel() {
    this.hotelService.addHotel({
      'name': this.name,
      'address': this.address,
      'city': this.city,
      'image': this.currentFileUpload.url
    })
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    this.upload();
  }

  goToHotelUsers(hotelId) {
    this.dataStorageService.setHotelId(hotelId);
    this.router.navigate(['home']);
  }
}
