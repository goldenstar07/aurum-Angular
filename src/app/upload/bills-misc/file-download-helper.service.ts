import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {getFileNameFromResponseContentDisposition, saveFile} from "./file-download-helper";


@Injectable()
export class FileDownloadHelperService {

  constructor() { }

  // downloadFile(propertyId: string, fileId: string) {
  //   const url = `${this.config.baseUrl}/properties/${propertyId}/files/${fileId}`;
  //   const options = new RequestOptions({responseType: ResponseContentType.Blob });
  //
  //   // Process the file downloaded
  //   this.http.get(url, options).subscribe(res => {
  //     const fileName = getFileNameFromResponseContentDisposition(res);
  //     saveFile(res.blob(), fileName);
  //   });
  // }

}
