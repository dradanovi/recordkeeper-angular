import { Component, OnInit, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectTableModel } from 'src/app/work/view-work/subject-popup/subject-table-model';
import { HttpClient } from '@angular/common/http';
import { FilterHoursUserPayload } from '../FilterHoursUserPayload.payload';

@Component({
  selector: 'app-view-users-popup',
  templateUrl: './view-users-popup.component.html',
  styleUrls: ['./view-users-popup.component.css']
})
export class ViewUsersPopupComponent implements OnInit {

  subjectsArray: Array<SubjectTableModel>;
  displayedColumns: string[] = ['title', 'start', 'end', 'desc'];
  dataSourceSubject: Array<SubjectTableModel>;

  constructor(public dialogRef: MatDialogRef<ViewUsersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterHoursUserPayload,
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

  findSubjects(data: FilterHoursUserPayload) {
    console.log("subject hours data" + data);
    this.subjectsArray = [];
    this.httpClient.post<Array<SubjectTableModel>>('http://localhost:8080/api/admin/user/subject/display', data, { responseType: 'json' })
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
