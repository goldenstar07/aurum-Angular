import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
// Interfaces
import {Bill} from "../interfaces/bill";
// Service
import {DataProcessingService} from "../../shared/services/data-processing.service";
import {DataStorageService} from "../../shared/services/data-storage.service";
import {UploadFileService} from "../../shared/services/upload-file.service";
import * as firebase from "firebase";
import {Hotel} from "../../hotels/interfaces/hotel";

/*import {default as storage} from "firebase/app";
import {getFileNameFromResponseContentDisposition, saveFile} from "../bills-misc/file-download-helper";
import {RequestOptions, ResponseContentType} from "@angular/http";
import { InterceptorService } from 'ng2-interceptors';*/
// import { ConfigService } from 'app/common/services/config.service';
import { saveAs } from "file-saver";
import * as FileSaver from "file-saver";
import {Http, HttpModule} from "@angular/http";
import * as url from "url";

// import {  } from "file-saver";


@Injectable()
export class BillService {
  billsCol: AngularFirestoreCollection<Bill>;
  bills: any;
  downloadedItem: any;
  hotelsCol: any;

  constructor(private afs: AngularFirestore,
              private dataStorageService: DataStorageService,
              private db: AngularFireDatabase,
              private uploadFileService: UploadFileService,
              private DataProcessingService: DataProcessingService,
              private http: Http,
              /*private fileSaver: MSFileSaver*/) {
  }

  getBills() {
    this.billsCol = this.afs.collection('bills');
    return this.billsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Bill;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }

  addBill(bill) {
    this.afs.collection('bills').add(bill);
  }

  deleteBillService(billId) {
    this.afs.doc('bills/' + billId).delete();
  }

  downloadItem(bill){
      const mainSection = document.getElementById('main');
      const urlOfFile = bill.data.image;


      const img = document.createElement('img');
      img.setAttribute('src', urlOfFile);
      // img.setAttribute('id', 'img');

      // console.log(img.src);
    // const canvas = this.convertImageToCanvas(img);

      const blob = new Blob([img],  {type: "image/png"});
      FileSaver.saveAs(blob, bill.data.name + '.png');
    // FileSaver.saveAs(blob, "myPDF_" + bill.data.name + ".jpg");

    // canvas.setAttribute('class', 'fileCanvas');

    // console.log(canvas);
    //
    // this.http.get(img.src)
    //   .map((res) => {
    //     console.log('Blob',res);
    //
    //     let obj: any = res[urlOfFile];
    //     return new Blob([obj], {type: 'image/jpeg'});
    //   })
    //   .subscribe(blob => {
    //     console.log('Blob',blob);
    //     FileSaver.saveAs(blob,bill.data.name)
    //   }, error => {
    //     console.log(error);
    //   })
  }




    // });
    // const dataURL = canvas.toDataURL('image/png');
    // dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // // console.log(canvas);
    // canvas.toBlob(function(blob) {
    //   console.log(blob);
    //   saveAs(blob, bill.data.name);
  }

  // convertImageToCanvas(image) {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = image.width;
  //   canvas.height = image.height;
  //   canvas.getContext("2d").drawImage(image, 0, 0);
  //
  //   return canvas;
  // }
