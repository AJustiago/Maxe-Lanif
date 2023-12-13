import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.scss']
})
export class InputGroupsComponent implements OnInit {
  public InputGroupForm!: FormGroup ;
  constructor(private formBuilder: FormBuilder) { }
  public routes = routes;
  ngOnInit() {
    // Basic Form Validation
    this.InputGroupForm = this.formBuilder.group({
    });
  }


}
