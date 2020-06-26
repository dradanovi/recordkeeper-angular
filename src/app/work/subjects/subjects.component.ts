import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SubjectsPopupComponent } from './popup/subjects-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SubjectPayload } from './subject.payload';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjectOpen: boolean;
  subjectPayload: SubjectPayload;

  constructor(private httpClient: HttpClient, public dialog: MatDialog,
    private shared: SharedService) {
    this.subjectPayload = {
      title: '',
      desc: ''
    }
  }

  ngOnInit(): void {
    this.checkSubject();
  }

  popPopup(): void {
    const dialogRef = this.dialog.open(SubjectsPopupComponent, {
      width: '250px',
      data: {
        title: this.subjectPayload.title, desc: this.subjectPayload.desc
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.subjectPayload.title = data.title,
        this.subjectPayload.desc = data.desc
      this.startSubject();
    }, error => {
      throwError(error);
    });

  }

  checkSubject() {
    this.shared.checkSubject().subscribe(data => {
      if (data == 'true') {
        this.subjectOpen = true;
      } else {
        this.subjectOpen = false;
      }
    }, error => {
      throwError(error);
    });
  }

  startSubject() {
    this.httpClient.post('http://localhost:8080/api/work/subject/new', this.subjectPayload, { responseType: 'text' }).subscribe(
      data => {
        console.log("Subject succesfully started", data);
        this.subjectOpen = true;
      }, error => {
        throwError(error);
      }
    );
  }

  endSubject() {
    this.shared.endSubject().subscribe(data => {
      if (data != null) {
        this.subjectOpen = false;
      }
    }, error => {
      this.subjectOpen = true;
    })
  }

}