import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterHoursPayload } from './filter-hours-payload';
import { FilerHoursModel } from './filter-hours-model';
import { throwError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubjectPopupComponent } from './subject-popup/subject-popup.component';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-work',
  templateUrl: './view-work.component.html',
  styleUrls: ['./view-work.component.css', '../../app.component.css']
})
export class ViewWorkComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataPresent: boolean;
  filterHoursPayload: FilterHoursPayload;
  hoursModel: FilerHoursModel;
  hoursArray: Array<FilerHoursModel> = [];
  total: number;

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  displayedColumns: string[] = ['start', 'end'];
  /* dataSource: Array<FilerHoursModel>; */
  dataSource = new MatTableDataSource();

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.filterHoursPayload = {
      end: '',
      start: ''
    }
    this.hoursModel = {
      start: '',
      end: '',
      username: ''
    }
    this.dataPresent = false;
    this.total = 0;
  }

  ngOnInit(): void {

  }

  click() {
    console.log("value " + this.startDate.value);
    console.log("substring " + this.startDate.value.toString().substring(4, 15));

  }

  dateToString(): FilterHoursPayload {
    this.filterHoursPayload.start = this.startDate.value.toString().substring(4, 15);
    this.filterHoursPayload.end = this.endDate.value.toString().substring(4, 15);
    return this.filterHoursPayload;
  }

  getTableData(hours: Array<FilerHoursModel>) {
    this.dataSource = new MatTableDataSource(hours);
    this.dataSource.paginator = this.paginator
  }

  /* Mon Jun 08 2020 00:00:00 GMT+0200 (Central European Summer Time) */

  findHours() {
    this.dataPresent = true;
    this.hoursArray = [];
    this.httpClient.post<Array<FilerHoursModel>>('http://localhost:8080/api/work/hours/display', this.dateToString(), { responseType: 'json' })
      .subscribe(data => {
        this.hoursArray = data;
      }, error => {
        throwError(error);
      }, () => {
        console.log("length after subscribe " + this.hoursArray.length);
        this.getTableData(this.hoursArray);
        this.getTotal(this.hoursArray);
      });
  }

  subjectPopup(row: any) {
    console.log(row.start);
    console.log(row.end);
    console.log(row);
    const dialogRef = this.dialog.open(SubjectPopupComponent, {
      width: '800px',
      data: {
        start: row.start, end: row.end
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotal(hoursArray: Array<FilerHoursModel>) {
    /* this.httpClient.post('http://localhost:8080/api/work/hours/total', this.hoursArray,
      { responseType: 'json' }).subscribe(data => {
        return data.toString;
      }, error => {
        throwError(error);
      });
      return ""; */
    this.total = 0;

    hoursArray.forEach(data => {
      this.stringToDate(data.start).toString();
      this.stringToDate(data.end);
      this.total = this.total + this.stringToDate(data.end) - this.stringToDate(data.start);
    });

    this.total = this.total / 1000 / 60 / 60;

    console.log("total " + this.total);
  }

  stringToDate(date: string): number {
    var day = Number(date.substring(0, 2));
    var month = Number(date.substring(3, 5));
    var year = Number(date.substring(6, 10));
    var hours = Number(date.substring(11, 13));
    var minutes = Number(date.substring(14, 16));
    return Date.parse((new Date(year, month - 1, day, hours, minutes)).toString());

  }
}
