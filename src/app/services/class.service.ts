import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: any = [];

  constructor() {}

  storeClass(data: any) {
    if (localStorage.getItem('classes') === null) {
      this.classes.push(data);

      localStorage.setItem('classes', JSON.stringify(this.classes));
    } else {
      const res: any = localStorage.getItem('classes');
      let classes = JSON.parse(res);
      localStorage.removeItem('classes');

      classes.push(data);
      localStorage.setItem('classes', JSON.stringify(classes));
    }

    return {
      status: 201,
      msg: 'Class Added!',
    };
  }

  getClasses() {
    if (localStorage.getItem('classes') === null) {
      return false;
    }

    const res: any = localStorage.getItem('classes');
    let classes = JSON.parse(res);

    return classes;
  }
}
