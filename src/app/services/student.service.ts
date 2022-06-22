import { Injectable } from '@angular/core';

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

  getStudents() {
    if (localStorage.getItem('students') === null) {
      return false;
    }

    const res: any = localStorage.getItem('students');
    let students = JSON.parse(res);

    return students;
  }
}
