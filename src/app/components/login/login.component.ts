import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReqresService } from '../../services/reqres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private _reqres:ReqresService, private router:Router) { }

  public Formulario:FormGroup

  public patternEmail:RegExp=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  public patternPassword:RegExp=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/


  ngOnInit() {
    this.iniciarFormulario();
  }




  public iniciarFormulario(){
    this.Formulario= this.fb.group({
      email:[null,[Validators.required,Validators.pattern(this.patternEmail)]],
      password:[null,[Validators.required,Validators.pattern(this.patternPassword)]]
    })
  }


  getErrorMessagePassword(){
    return this.Formulario.get('password').hasError('required')?'You must enter value':
           this.Formulario.get('password').hasError('pattern')? 'Not valid password':null
  }
  getErrorMessageEmail(){
    return this.Formulario.get('email').hasError('required')?'You must enter value':
           this.Formulario.get('email').hasError('pattern')? 'Not valid password':null
  }





  public sendForm(){
    this._reqres.PostLogin(this.Formulario.value).subscribe((data:{token:string})=>{

      localStorage.setItem('token',data.token)
      this.router.navigate(['/principal'])

    })
  }

}
