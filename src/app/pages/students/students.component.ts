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
  studentEditModal: boolean = false;
  studentForm: FormGroup;
  students: any = [];

  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.studentForm = new FormGroup({
      studentNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      yearLevel: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
    });
  }

  editStudentData(data: any) {
    const { studentNumber, name, course, yearLevel, section } = data;

    this.studentEditModal = true;

    this.studentForm.setValue({
      studentNumber,
      name,
      course,
      yearLevel,
      section,
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  openCloseStudentModal() {
    this.studentModal = !this.studentModal;
  }

  openCloseEditModal() {
    this.studentEditModal = !this.studentEditModal;

    this.studentForm.reset();
  }

  logout() {
    this.authService.logout();
  }

  getStudents() {
    this.students = this.studentService.getStudents();
  }

  deleteStudent(data: any) {
    const students = this.students.filter((res: any) => {
      return res.studentNumber !== data.studentNumber;
    });

    this.studentService.storeToStorage(students)
    this.getStudents();
  }

  onSubmitStudentEdit() {
    if (this.studentForm.status == 'INVALID') {
      return;
    }

    this.studentService.updateStudentData(this.studentForm.value);

    this.studentEditModal = false;
    this.studentForm.reset();
    this.getStudents();
  }

  onSubmitStudentCreation() {
    if (this.studentForm.status == 'INVALID') {
      return;
    }

    this.studentService.storeStudent(this.studentForm.value);

    this.studentModal = false;
    this.studentForm.reset();
    this.getStudents();
  }
}
