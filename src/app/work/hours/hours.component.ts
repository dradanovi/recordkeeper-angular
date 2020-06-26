import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectsComponent } from '../subjects/subjects.component';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  isWorking: boolean;
  string: String;

  constructor(private httpClient: HttpClient, private router: Router,
    private toastr: ToastrService, private shared: SharedService) {
    this.checkWork();
    this.isWorking = false;
  }

  ngOnInit(): void {
    this.checkWork();
    console.log("is working " + this.isWorking);
    console.log("check work " + this.shared.checkWork());
    
    
  }

  startWork() {
    this.httpClient.post('http://localhost:8080/api/work/hours/new', null,
      { responseType: 'text' }).subscribe(data => {
        console.log("Work Started Succesfully", data);
        this.isWorking = true;
        this.toastr.success('Started Work');
      }, error => {
        throwError(error);
      });
  }

  checkWork() {
    this.shared.checkWork().subscribe(data => {
      if (data == 'true') {
        this.isWorking =  true;
      } else {
        this.isWorking =  false;
      }
    });
  }

  stopWork() {
    this.httpClient.post('http://localhost:8080/api/work/hours/close', null,
      { responseType: 'text' }).subscribe(data => {
        console.log(data);
        this.isWorking = false;
        this.toastr.success('Ended Work');
        this.router.navigateByUrl('review');
      }, error => {
        throwError(error);
      });
  }
}
