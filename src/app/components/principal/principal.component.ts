import { Component, OnInit } from '@angular/core';
import { ReqresService } from '../../services/reqres.service';
import { dataUsers } from 'src/app/interfaces/reqres.interfaces';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { debounceTime, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private reqres: ReqresService, private modalService: NgbModal, private fb: FormBuilder) {
    this.reqres.GetUsers().subscribe(data => { this.UserData = data; this.UserData2 = data })

  }

  public UserData: dataUsers[];
  public UserData2: dataUsers[];
  closeResult: string;
  formulario: FormGroup
  searchFormControl: FormControl


  ngOnInit() {

    this.InitForm();
  }


  InitForm() {


    this.searchFormControl = new FormControl(null, Validators.pattern(/^[a-zA-Z\s]*$/))
    this.searchFormControl.valueChanges.pipe(
      debounceTime(2000),
      map(
        (termino: string) => termino != "" ? this.UserData.filter(User => User.first_name.toLowerCase().indexOf(termino.toLowerCase()) > -1) : this.UserData2
      )
    ).subscribe(data => this.UserData = data)


    this.formulario = this.fb.group({
      userName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      job: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]

    })

  }


  open(content, from, id) {

    this.formulario.reset();


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (from) this.update(id)
    });
  }

  public update(id) {

    this.reqres.updateUser(id, this.formulario.value).subscribe(data => console.log(data));


  }



  public saveUser() {
    this.reqres.createUser(this.formulario.value).subscribe(data => {
      this.modalService.dismissAll();

    })



  }


  eliminarUsuarios(id) {
    this.reqres.deleteUser(id).subscribe();
  }


  errorsFormsUsername() {
    return this.formulario.get('userName').hasError('required') ? 'Este campo es necesario' : this.formulario.get('userName').hasError('pattern') ? 'Formato de nombre incorrecto' : null

  }


  errorsFormsJob() {
    return this.formulario.get('job').hasError('required') ? 'Este campo es necesario' : this.formulario.get('job').hasError('pattern') ? 'Formato incorrecto en el job' : null
  }

}
