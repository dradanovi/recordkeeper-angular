import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from './employee-model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css', '../../app.component.css']
})
export class EmployeeCardComponent implements OnInit {

  public now: Date = new Date();

  employee: EmployeeModel;
  picUrl: any = null;
  username: string;

  constructor(private authService: AuthService, private httpClient: HttpClient, private _sanitizer: DomSanitizer,
    private localStorage: LocalStorageService) {
    this.employee = {
      firstName: '',
      lastName: '',
      username: '',
      oib: '',
      address: ''
    }
    this.authService.username.subscribe((data: string) => this.username = data);
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    console.log('init');
    this.getEmployeePayload();
    this.getApiImage();
    console.log("username" + this.employee.username);
    console.log("local user " + this.username);
  }

  getEmployeePayload() {
    this.httpClient.get<EmployeeModel>('http://localhost:8080/api/user//view/details').subscribe(data => {
      this.employee.username = data.username;
      this.employee.firstName = data.firstName;
      this.employee.lastName = data.lastName;
      this.employee.oib = data.oib;
      this.employee.address = data.address;
      console.log("log" + data.username);
    }, error => {
      throwError(error);
    });
  }

  getImage(image) {
    return this._sanitizer.bypassSecurityTrustUrl(image);
  }

  getApiImage(){
    console.log("local storage username " + this.localStorage.retrieve('username'));
    
    this.httpClient.get('http://localhost:8080/api/user/img/' + this.localStorage.retrieve('username'), { responseType: 'blob' }).subscribe(data => {
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
  }
  
}
