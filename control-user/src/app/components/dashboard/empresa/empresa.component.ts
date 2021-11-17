import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public businesss: any[];
  aplication: {id: string, name: string};
  formEmpre: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAplication();
    this.iniciarForm();
    this.getAll(this.aplication.id);
  }

  getAplication(){
    this.aplication = {
      id: this.rutaActiva.snapshot.params.id,
      name: this.rutaActiva.snapshot.params.name,
    };
  }

  iniciarForm(){
    this.formEmpre = this.fb.group( {
      id: 0,
      name: '',
      direction: '',
      cp: '',
      contact: '',
      phone: '',
      email: '',
      rfc: '',
      id_aplication: 0,
    })
    
  }

  getAll(id: any){
    this.http.get(`http://localhost:8000/api/v1/user/businesses/aplication/${id}`).subscribe(
       (result: any) => {
         this.businesss = result.business;
         console.log(this.businesss);
       },
       error => {
         console.log('error to conected');
         console.log(error);
       }
    );
  }
  
  


  create(){
    const formData = this.formEmpre.getRawValue();
    
    const data = {
      id: formData.id,
      name: formData.name,
      direction: formData.direction,
      cp: formData.cp,
      contact: formData.contact,
      phone: formData.phone,
      email: formData.email,
      rfc: formData.rfc,
      id_aplication: this.aplication.id,
    }
    
    console.log(data);
    console.log("DATA ID =",data.id);
    if(data.id != 0)
    {
      this.http.put(`http://localhost:8000/api/v1/user/businesses/${data.id}`, data).subscribe(
        (result: any) => {
          this.getAll(data.id_aplication);
          this.iniciarForm();
        },
        error => {
          console.log('error to conected');
          console.log(error);
        }
      );
    }
    else
    {
      console.log("entra al else");
        this.http.post('http://localhost:8000/api/v1/user/businesses', data).subscribe(
        (result: any) => {
          console.log(result);
          this.getAll(data.id_aplication);
          this.iniciarForm();
        },
        error => {
          console.log('error to conected');
          console.log(error);
        }
      );
    }
    
  }
  
  data(businesses: any){
    this.formEmpre = this.fb.group( {
      id: businesses.id,
      name: businesses.name,
      direction: businesses.direction,
      cp: businesses.cp,
      contact: businesses.contact,
      phone: businesses.phone,
      email: businesses.email,
      rfc: businesses.rfc,
      id_aplication: this.aplication.id
    })
  } 

  
  delete(){
      const formData = this.formEmpre.getRawValue();
      console.log("borrar empresa",formData.id);
      this.http.delete(`http://localhost:8000/api/v1/user/businesses/${formData.id}`).subscribe(
          (result: any) => {
              console.log(result)
              this.getAll(formData.id_aplication);
              this.iniciarForm();
          },
          error => {
              console.log('error to conected');
              console.log(error);
          }
      );
  }

}
