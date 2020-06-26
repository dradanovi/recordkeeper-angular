import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectPayload } from '../subject.payload';

@Component({
  selector: 'app-subjects-popup',
  templateUrl: './subjects-popup.component.html',
  styleUrls: ['./subjects-popup.component.css']
})
export class SubjectsPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SubjectsPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SubjectPayload) { }

  onNoClick(): void {
      this.dialogRef.close();
  }  
  
  ngOnInit(): void {
  }

}
