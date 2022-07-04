import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup

  constructor(private authService: AuthService, public router: Router) { 
    this.initializeForm();
  }

  checkIfAuth() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.checkIfAuth()
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('admin', Validators.required),
      password: new FormControl('admin', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.status == 'INVALID') {
      alert("Invalid entered data.")
      return;
    }
    
    this.authService.login(this.loginForm.value);
  }

}
