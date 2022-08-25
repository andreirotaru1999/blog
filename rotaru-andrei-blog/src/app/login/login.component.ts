import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void {
    this.loginService.login(this.form.getRawValue()).subscribe((user) => {
      console.log(user);
      document.cookie = user.role;
       this.router.navigate(['/'])
    })
  }

  logout(): void {
    console.log("logout");
    this.loginService.logout().subscribe();
  }
}