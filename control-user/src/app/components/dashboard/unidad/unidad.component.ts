import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {

  public business_units: any[];
  empresa: { aplication: string, id: string, name: string };
  formUnit: FormGroup;

  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDataEmp();
    this.iniciarForm();
    this.getAllUnidad(this.empresa.id);
  }

  getDataEmp() {
    this.empresa = {
      aplication: this.rutaActiva.snapshot.params.aplication,
      id: this.rutaActiva.snapshot.params.id,
      name: this.rutaActiva.snapshot.params.name,
    };
    console.log("datos", this.empresa);
  }

  iniciarForm(){
    this.formUnit = this.fb.group( {
      id: 0,
      name: '',
      description: '',
      id_business: 0,
    })
    
  }

  getAllUnidad(id: any) {
    this.http.get(`http://localhost:8000/api/v1/user/businesUnits/businesses/${id}`).subscribe(
      (result: any) => {
        this.business_units = result.business_unit;
        console.log("Todas las unidades ", this.business_units);
      },
      error => {
        console.log('error to conected');
        console.log(error);
      }
    );
  }

  setUnit(data: any){
    console.log("empisa SetUnit",data);
    this.formUnit = this.fb.group( {
      id: data.id,
      name: data.name,
      description: data.description,
      id_business: this.empresa.id,
    })
  }

  
  guardar(){
    const formData = this.formUnit.getRawValue();
    
    const data = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      id_business: this.empresa.id
    }
    
    console.log(data);
    if(data.id != 0)
    {
      this.http.put(`http://localhost:8000/api/v1/user/businesUnits/${data.id}`, data).subscribe(
        (result: any) => {
          
          this.getAllUnidad(data.id_business);
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
        this.http.post('http://localhost:8000/api/v1/user/businesUnits', data).subscribe(
        (result: any) => {
          console.log(result)
          this.getAllUnidad(data.id_business);
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
    const formData = this.formUnit.getRawValue();
    console.log("eliminar",formData.id);
    this.http.delete(`http://localhost:8000/api/v1/user/businesUnits/${formData.id}`).subscribe(
        (result: any) => {
            console.log("eliminado",result)
            this.getAllUnidad(formData.id_business);
            this.iniciarForm();
        },
        error => {
            console.log('error to conected');
            console.log(error);
        }
    );
}

}
