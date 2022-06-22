import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  classes: any = []
  classModal: boolean = false;
  classForm: FormGroup;

  constructor(private authService: AuthService, private classService: ClassService) {
    this.classForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required),
      yearLevel: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
    this.getClasses()
  }

  openCloseModal() {
    this.classModal = !this.classModal;
  }

  getClasses() {
    this.classes = this.classService.getClasses()
  }

  logout() {
    this.authService.logout()
  }

  onSubmit() {
    if (this.classForm.status == 'INVALID') {
      return;
    }

    this.classService.storeClass(this.classForm.value);
    this.classForm.reset()
    this.classModal = false
    this.getClasses()
  }

}
