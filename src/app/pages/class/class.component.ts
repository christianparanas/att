import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent implements OnInit {
  attendanceForm: FormGroup;
  addAttModal: any = false;
  attendance: any = [];

  data: any = {
    course: '',
    year: '',
    section: '',
    subject: '',
  };

  openCloseAddAttModal() {
    this.addAttModal = !this.addAttModal;
  }

  constructor(
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {
    this.getAttendance()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.data.course = params.course;
      this.data.year = params.year;
      this.data.section = params.section;
      this.data.subject = params.subject;
    });

    this.initForm();
    this.getAttendance()
  }

  initForm() {
    this.attendanceForm = new FormGroup({
      subject: new FormControl(this.data.subject, Validators.required),
      course: new FormControl(this.data.course, Validators.required),
      year: new FormControl(this.data.year, Validators.required),
      section: new FormControl(this.data.section, Validators.required),
      session_number: new FormControl('', Validators.required),
      session_topic: new FormControl('', Validators.required),
    });
  }

  changeStatus(param: any, data: any, id: any) {
    this.attendanceService.changeAttStatus(param, data, id)
    this.getAttendance()
  }

  getAttendance() {
    this.attendance = this.attendanceService.getAttendance({ ...this.data })

    console.log(this.attendance)
  }

  onSubmit() {
    if (this.attendanceForm.status == 'INVALID') {
      return;
    }

    this.attendanceService.storeAttendance(this.attendanceForm.value);
    this.addAttModal = false;
    this.getAttendance()
  }
}
