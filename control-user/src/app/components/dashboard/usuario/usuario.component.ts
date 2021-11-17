import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public users: any[];
  //public modulo_users: any[];
  //public user_has_modules: any[];
  //module: {aplication:string, id: string, name: string};
  //form: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.getAllUsers();
  }

  getAllUsers(){
    this.http.get('http://localhost:8000/api/v1/user/users').subscribe(
       (result: any) => {
         this.users = result.user;
         console.log("usuarios", this.users);
       },
       error => {
         console.log('error to conected');
         console.log(error);
       }
    );
  }
}
