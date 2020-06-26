import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css', '../../app.component.css']
})
export class WorkComponent implements OnInit {

  public now: Date = new Date();

  constructor(private shared: SharedService) { 
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
  }

}
