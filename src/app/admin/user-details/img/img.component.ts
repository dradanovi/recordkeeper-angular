import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from './image-service.service';
import { HttpClient } from '@angular/common/http';
import { ViewUsersComponent } from '../../view-users/view-users.component';
import { UserDetailsComponent } from '../user-details.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  fileData: File = null;
  username: string = 'marko';
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private http: HttpClient, private user: UserDetailsComponent, private localStorage: LocalStorageService) { }

  ngOnInit() {

  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('http://localhost:8080/api/admin/user/img/save/' + this.localStorage.retrieve('selected'), formData)
      .subscribe(res => {
        this.previewUrl = null;
        console.log(res);
        /* this.uploadedFilePath = res.data.filePath; */
        alert('SUCCESS !!');
      })
  }

}
