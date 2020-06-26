import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FilerHoursModel } from 'src/app/work/view-work/filter-hours-model';
import { MatTableDataSource } from '@angular/material/table';
import { FilterHoursPayload } from 'src/app/work/view-work/filter-hours-payload';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FilterHoursUserPayload } from './FilterHoursUserPayload.payload';
import { ViewUsersPopupComponent } from './view-users-popup/view-users-popup.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css', '../admin/admin.component.css']
})
export class ViewUsersComponent implements OnInit {

  selected = '';
  usernameArray: string[] = [];

  dataPresent: boolean;
  filterHoursUserPayload: FilterHoursUserPayload;
  hoursModel: FilerHoursModel;
  hoursArray: Array<FilerHoursModel> = [];
  total: number;

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['start', 'end', 'username'];
  dataSource = new MatTableDataSource();

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.filterHoursUserPayload = {
      end: '',
      start: '',
      username: ''
    }
    this.hoursModel = {
      start: '',
      end: '',
      username: ''
    }
    this.dataPresent = false;
  }

  ngOnInit(): void {
    this.getEmployeeUsernames().subscribe(data => {
      this.usernameArray = data;
    });
  }

  getEmployeeUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/api/admin/users/all');
  }

  onChange() {
    this.findHours();
  }

  dateToString(): FilterHoursPayload {
    this.filterHoursUserPayload.start = this.startDate.value.toString().substring(4, 15);
    this.filterHoursUserPayload.end = this.endDate.value.toString().substring(4, 15);
    this.filterHoursUserPayload.username = this.selected;
    return this.filterHoursUserPayload;
  }

  getTableData(hours: Array<FilerHoursModel>) {
    this.dataSource = new MatTableDataSource(hours);
    this.dataSource.paginator = this.paginator
  }

  /* Mon Jun 08 2020 00:00:00 GMT+0200 (Central European Summer Time) */

  findHours() {
    this.dataPresent = true;
    this.hoursArray = [];
    this.httpClient.post<Array<FilerHoursModel>>('http://localhost:8080/api/admin/user/hours/display', this.dateToString(), { responseType: 'json' })
      .subscribe(data => {
        this.hoursArray = data;
      }, error => {
        throwError(error);
      }, () => {
        console.log("length after subscribe " + this.hoursArray.length);
        this.getTableData(this.hoursArray);
      });
  }

  subjectPopup(row: any) {
    console.log(row.start);
    console.log(row.end);
    console.log(row);
    const dialogRef = this.dialog.open(ViewUsersPopupComponent, {
      width: '800px',
      data: {
        start: row.start, end: row.end, username: row.username
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
