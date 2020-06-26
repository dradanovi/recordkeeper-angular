import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterHoursPayload } from '../filter-hours-payload';
import { HttpClient } from '@angular/common/http';
import { SubjectTableModel } from './subject-table-model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject-popup.component.html',
  styleUrls: ['./subject-popup.component.css']
})
export class SubjectPopupComponent implements OnInit {

  subjectsArray: Array<SubjectTableModel>;
  displayedColumns: string[] = ['title', 'start', 'end', 'desc'];
  dataSourceSubject: Array<SubjectTableModel>;

  constructor(public dialogRef: MatDialogRef<SubjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterHoursPayload,
    private httpClient: HttpClient) {
      this.subjectsArray = [];
      this.dataSourceSubject = [];
     }

  onClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.findSubjects(this.data);
  }

  findSubjects(data: FilterHoursPayload) {
    console.log("subject hours data" + data);
    this.subjectsArray = [];
    this.httpClient.post<Array<SubjectTableModel>>('http://localhost:8080/api/work/subject/display', data, { responseType: 'json' })
      .subscribe(data => {
        this.subjectsArray = data;
      }, error => {
        throwError(error);
      }, () => {
        console.log("subject length after subscribe " + this.subjectsArray.length);
        this.getTableData(this.subjectsArray);
      });
  }

  getTableData(hours: Array<SubjectTableModel>){
    this.dataSourceSubject = [];
    this.dataSourceSubject = hours;
  }

}
