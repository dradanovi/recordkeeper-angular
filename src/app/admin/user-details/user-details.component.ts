import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetailsPayload } from './user-details.payload';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css', '../admin/admin.component.css']
})
export class UserDetailsComponent implements OnInit {

  detailsPayload: UserDetailsPayload;
  detailsGroup: FormGroup;
  isError: boolean;
  selected = '';
  picUrl: any = null;

  usernameArray: string[] = [];

  constructor(private httpClient: HttpClient, private route: Router, private _sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
    this.detailsPayload = {
      firstName: '',
      lastName: '',
      oib: '',
      address: '',
      username: ''
    }
  }

  ngOnInit(): void {
    this.getEmployeeUsernames().subscribe(data => {
      this.usernameArray = data;
    });
    this.detailsGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      oib: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  getSelected(): string {
    return this.selected;
  }

  getEmployeeUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/api/admin/users/all');
  }

  getImage(image) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  onChange(event: string) {
    this.localStorage.store('selected', this.selected);
    this.httpClient.get('http://localhost:8080/api/user/img/' + this.selected, { responseType: 'blob' }).subscribe(data => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.picUrl = reader.result;
      }, false);

      if (data) {
        reader.readAsDataURL(data);
      }
    }, error => {
      this.picUrl = null;
      throwError(error);

    });

    this.httpClient.post<UserDetailsPayload>('http://localhost:8080/api/admin/user/detail', event, { responseType: 'json' }).subscribe(data => {
      if (data.firstName != null) {
        this.detailsGroup.controls.firstName.setValue(data.firstName);
      } else {
        this.detailsGroup.controls.firstName.setValue('');
      }
      if (data.lastName != null) {
        this.detailsGroup.controls.lastName.setValue(data.lastName);
      } else {
        this.detailsGroup.controls.lastName.setValue('');
      }
      if (data.oib != null) {
        this.detailsGroup.controls.oib.setValue(data.oib);
      } else {
        this.detailsGroup.controls.oib.setValue('');
      }
      if (data.address != null) {
        this.detailsGroup.controls.address.setValue(data.address);
      } else {
        this.detailsGroup.controls.address.setValue('');
      }
    }, error => {
      throwError(error);
    })
  }

  editDetails() {
    this.detailsPayload.firstName = this.detailsGroup.controls.firstName.value;
    this.detailsPayload.lastName = this.detailsGroup.controls.lastName.value;
    this.detailsPayload.oib = this.detailsGroup.controls.oib.value;
    this.detailsPayload.address = this.detailsGroup.controls.address.value;
    this.detailsPayload.username = this.detailsGroup.controls.username.value;
    this.httpClient.post('http://localhost:8080/api/admin/user/detail/edit', this.detailsPayload, { responseType: 'text' })
      .subscribe(data => {
        console.log("edit details success");
        this.route.navigateByUrl('/admin');
      });
  }

  sendMail(){
    console.log("send mail " + this.selected);
    this.httpClient.post('http://localhost:8080/api/admin/mail/' + this.selected, null).subscribe(data => {
      console.log("mail sent");
    })
  }
}
