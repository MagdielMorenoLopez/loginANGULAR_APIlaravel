import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {

  public modules: any[];
  aplication: {id: string, name: string};
  form: FormGroup;

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
    this.form = this.fb.group( {
      id: 0,
      name: '',
      description: '',
      id_aplication: 0,
    })
    
  }

  getAll(id: any){
    this.http.get(`http://localhost:8000/api/v1/user/modules/aplication/${id}`).subscribe(
       (result: any) => {
         this.modules = result.module;
         console.log(this.modules);
       },
       error => {
         console.log('error to conected');
         console.log(error);
       }
    );
  }

  data(data: any){
    this.form = this.fb.group( {
      id:  data.id,
      name: data.name,
      description: data.description,
      id_aplication: this.aplication.id
    })
  }

  guardar(){
    const formData = this.form.getRawValue();
    
    const data = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      id_aplication: this.aplication.id
    }
    
    console.log(data);
    if(data.id != 0)
    {
      this.http.put(`http://localhost:8000/api/v1/user/modules/${data.id}`, data).subscribe(
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
        this.http.post('http://localhost:8000/api/v1/user/modules', data).subscribe(
        (result: any) => {
          console.log(result)
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

  delete(){
      const formData = this.form.getRawValue();
      console.log(formData.id);
      this.http.delete(`http://localhost:8000/api/v1/user/modules/${formData.id}`).subscribe(
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
