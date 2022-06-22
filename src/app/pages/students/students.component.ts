import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentModal: boolean = false;
  studentForm: FormGroup;
  students: any = [];

  constructor(private authService: AuthService, private studentService: StudentService) {
    this.studentForm = new FormGroup({
      studentNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      yearLevel: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getStudents()
  }

  openCloseModal() {
    this.studentModal = !this.studentModal;
  }

  logout() {
    this.authService.logout();
  }

  getStudents() {
    this.students = this.studentService.getStudents()
  }

  onSubmit() {
    if (this.studentForm.status == 'INVALID') {
      return;
    }

    this.studentService.storeStudent(this.studentForm.value);
    this.studentForm.reset()
    this.studentModal = false
    this.getStudents()
  }
}
