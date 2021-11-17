import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modulo-usuario',
  templateUrl: './modulo-usuario.component.html',
  styleUrls: ['./modulo-usuario.component.css']
})
export class ModuloUsuarioComponent implements OnInit {

  public users: any[];
  public user_has_modules: any[];
  public idUser: any[];
  module: { aplication: string, id: string, name: string };
  formUser: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.iniciarForm();
    this.getUsuarios(this.module.id);
    this.getAllUsers();
  }

  getData() {
    this.module = {
      aplication: this.rutaActiva.snapshot.params.aplication,
      id: this.rutaActiva.snapshot.params.id,
      name: this.rutaActiva.snapshot.params.name,
    };
  }

  iniciarForm() {
    this.formUser = this.fb.group({
      id: 0,
      id_user: '',
      id_module: 0,
    })
    console.log('pasa por inicioform');
  }

  getUsuarios(id: any) {
    console.log("pasa: ", id);
    this.http.get(`http://localhost:8000/api/v1/user/userHasModule/modules/${id}`).subscribe(
      (result: any) => {
        this.user_has_modules = result.user_has_module;
        console.log("usuario mod", this.user_has_modules);
      },
      error => {
        console.log('error to conected');
        console.log(error);
      }
    );
  }

  getAllUsers() {
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


  create(iduser: any) {
    const formData = this.formUser.getRawValue();

    const data = {
      id: formData.id,
      id_user: iduser,
      id_module: this.module.id

    }

    console.log("pasa por guardar", data);
    if (data.id != 0) {
      this.http.put(`http://localhost:8000/api/v1/user/userHasModule`, data).subscribe(
        error => {
          console.log('error to existe');
          console.log(error);
        }
      );
    }
    else {
      this.http.post('http://localhost:8000/api/v1/user/userHasModule', data).subscribe(
        (result: any) => {
          console.log(result)
          this.getUsuarios(data.id_module);
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
    this.formUser = this.fb.group({
      id: data.id,
      id_user: data.id_user,
      id_module: this.module.id
    })
    console.log("DATA ", data.id);
  }

  delete() {
    const formData = this.formUser.getRawValue();
    console.log("borrar usuario", formData.id);
    this.http.delete(`http://localhost:8000/api/v1/user/userHasModule/${formData.id}`).subscribe(
      (result: any) => {
        console.log(result)
        this.getUsuarios(formData.id_module);
        this.iniciarForm();
      },
      error => {
        console.log('error to conected');
        console.log(error);
      }
    );
  }

}
