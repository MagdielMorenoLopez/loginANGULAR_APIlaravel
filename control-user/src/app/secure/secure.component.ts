import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
    //user:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      // get Authorization
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${ localStorage.getItem('token')}`
      });

    this.http.get('http://localhost:8000/api/v1/user/user', {headers:headers}).subscribe(
         result =>{
          //this.user = result;
          console.log(result);
         }
    );
  }

}
