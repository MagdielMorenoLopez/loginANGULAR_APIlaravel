import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-unit',
  templateUrl: './user-unit.component.html',
  styleUrls: ['./user-unit.component.css']
})
export class UserUnitComponent implements OnInit {

  public Unitusers: any[];
  public users: any[];
  unidad: { empresa: string, id: string, name: string };
  formUserUnit: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDataUser();
    this.iniciarForm();
    this.getAllUsers();
    this.getUsuarios(this.unidad.id);
  }


  getDataUser() {
    this.unidad = {
      empresa: this.rutaActiva.snapshot.params.empresa,
      id: this.rutaActiva.snapshot.params.id,
      name: this.rutaActiva.snapshot.params.name,
    };
    console.log("datos", this.unidad);
  }
  
  iniciarForm(){
    this.formUserUnit = this.fb.group( {
      id: 0,
      id_user: '',
      id_business_unit: 0,
    })
    
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

  getUsuarios(id: any) {
    console.log("pasa: ", id);
    this.http.get(`http://localhost:8000/api/v1/user/userUnits/businesUnits/${id}`).subscribe(
      (result: any) => {
        this.Unitusers = result.user_unit;
        console.log("usuario mod", this.Unitusers);
      },
      error => {
        console.log('error to conected');
        console.log(error);
      }
    );
  }
  
  create(iduser: any) {
    const formData = this.formUserUnit.getRawValue();

    const data = {
      id: formData.id,
      id_user: iduser,
      id_business_unit: this.unidad.id

    }

    console.log("pasa por guardar", data);
    if (data.id != 0) {
      this.http.put(`http://localhost:8000/api/v1/user/userUnits`, data).subscribe(
        error => {
          console.log('error to existe');
          console.log(error);
        }
      );
    }
    else {
      this.http.post(`http://localhost:8000/api/v1/user/userUnits`, data).subscribe(
        (result: any) => {
          console.log(result)
          this.getUsuarios(data.id_business_unit);
          this.iniciarForm();
        },
        error => {
          console.log('error to conected');
          console.log(error);
        }
      );
    }

  }




  
  data(data: any) {
    this.formUserUnit = this.fb.group({
      id: data.id,
      id_user: data.id_user,
      id_business: this.unidad.id
    })
    console.log("DATA ", data.id);
  }

  delete() {
    const formData = this.formUserUnit.getRawValue();
    console.log("borrar usuario", formData.id);
    this.http.delete(`http://localhost:8000/api/v1/user/userUnits/${formData.id}`).subscribe(
      (result: any) => {
        console.log(result)
        this.getUsuarios(formData.id_business_unit);
        this.iniciarForm();
      },
      error => {
        console.log('error to conected');
        console.log(error);
      }
    );
  }
  
}
