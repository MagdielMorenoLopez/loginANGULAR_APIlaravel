
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Crear Cuenta';
  form: FormGroup;
  constructor(private fb: FormBuilder,
     private http: HttpClient,
     private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group( {
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      direction: ['', Validators.required],
      cp: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      profile: ['', Validators.required]
    })
  }

  submit(){
    const formData = this.form.getRawValue();

      this.http.post('http://localhost:8000/api/v1/user/register', formData).subscribe( 
      
        (result: any) => {
          localStorage.setItem('token', result.access_token);
          this.router.navigate(['/']);
          //console.log('success');
          //console.log(result);
        },
      error => {
        console.log('Error to register');
        console.log(error);
        
      }

    );
  }

}
