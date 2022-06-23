import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: any = [];

  constructor() {}

  storeStudent(data: any) {
    if (localStorage.getItem('students') === null) {
      this.students.push(data);

      localStorage.setItem('students', JSON.stringify(this.students));
    } else {
      const res: any = localStorage.getItem('students');
      let students = JSON.parse(res);
      localStorage.removeItem('students');

      students.push(data);
      localStorage.setItem('students', JSON.stringify(students));
    }

    return {
      status: 201,
      msg: 'Student Added!',
    };
  }

  updateStudentData(data: any) {
    const target = this.students.find(
      (res: any) => res.studentNumber === data.studentNumber
    );

    target.name = data.name
    target.course = data.course
    target.year = data.year
    target.section = data.section

    localStorage.removeItem('students');
    this.storeToStorage(this.students);
  }

  storeToStorage(data: any) {
    localStorage.setItem('students', JSON.stringify(data));
  }

  getStudents() {
    if (localStorage.getItem('students') === null) {
      return false;
    }

    const res: any = localStorage.getItem('students');
    this.students = JSON.parse(res);

    return this.students;
  }
}
