import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-basic-inputs',
  templateUrl: './basic-inputs.component.html',
  styleUrls: ['./basic-inputs.component.scss']
})
export class BasicInputsComponent implements OnInit {
  public basicForm!: FormGroup ;
  public routes = routes;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicForm = this.formBuilder.group({
      txt: [""],
    });
  }


}
