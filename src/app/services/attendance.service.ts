import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  attendance: any = [];
  students: any = [];

  constructor() {}

  changeAttStatus(param: any, data: any, id: any) {
    const res: any = localStorage.getItem('attendance');
    this.attendance = JSON.parse(res);

    const app = this.attendance.find((rest: any) => rest.id == data.id);

    console.log(app);
    
    if (param == 1) {
      app.students.find(
        (item: any) => item.student_number == id
      ).attendance_status = 'present';
    } else if (param == 2) {
      app.students.find(
        (item: any) => item.student_number == id
      ).attendance_status = 'absent';
    }

    localStorage.removeItem('attendance');

    let arr = this.attendance.filter((obj: any) => {
      return obj.id != data.id;
    });

    arr.push(app);

    localStorage.setItem('attendance', JSON.stringify(arr));
  }

  storeAttendance(data: any) {
    const res: any = localStorage.getItem('students');
    const parsed = JSON.parse(res);

    this.students = parsed.filter(
      (student: any) =>
        student.course == data.course &&
        student.yearLevel == data.year &&
        student.section == data.section
    );
    const filtered = data;

    filtered['id'] = Math.random().toString(36).slice(2, 7);
    filtered['students'] = this.students.map((item: any) => {
      return {
        student_number: item.studentNumber,
        name: item.name,
        attendance_status: 'pending',
      };
    });

    if (localStorage.getItem('attendance') === null) {
      this.attendance.push(filtered);

      localStorage.setItem('attendance', JSON.stringify(this.attendance));
    } else {
      const res: any = localStorage.getItem('attendance');
      let attendance = JSON.parse(res);
      localStorage.removeItem('attendance');

      attendance.push(filtered);
      localStorage.setItem('attendance', JSON.stringify(attendance));
    }

    return {
      status: 201,
      msg: 'Attendance Added!',
    };
  }

  getAttendance(data: any) {
    if (localStorage.getItem('attendance') === null) {
      return false;
    }

    const res: any = localStorage.getItem('attendance');
    this.attendance = JSON.parse(res);

    const arr = this.attendance.filter(
      (att: any) =>
        att.subject == data.subject &&
        att.course == data.course &&
        att.year == data.year &&
        att.section == data.section
    );

    return arr;
  }
}
