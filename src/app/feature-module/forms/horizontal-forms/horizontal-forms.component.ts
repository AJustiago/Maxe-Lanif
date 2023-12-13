import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-horizontal-forms',
  templateUrl: './horizontal-forms.component.html',
  styleUrls: ['./horizontal-forms.component.scss']
})
export class HorizontalFormsComponent implements OnInit {
  public basicForm!: FormGroup ;
  public addressForm!: FormGroup ;
  public twoColumnFormOne!: FormGroup ;
  public twoColumnFormTwo!: FormGroup ;
  public routes = routes;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Basic Form Validation
    this.basicForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });


    // Address Form Validation

    this.addressForm = this.formBuilder.group({
      addressOne: ['', [Validators.required]],
      addressTwo: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });


    // Horizontal Form Validation

    this.twoColumnFormOne = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      addresslineone: ['', [Validators.required]],
      addresslinetwo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });


    // Horizontal Form Validation

    this.twoColumnFormTwo = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      state: ['', [Validators.required]],
      textArea: ['', [Validators.required]],
      personalFirstName: ['', [Validators.required]],
      personalLastName: ['', [Validators.required]],
      personalEmail: ['', [Validators.required]],
      personalPhone: ['', [Validators.required]],
      personalCountry: ['', [Validators.required]],
      personalZipCode: ['', [Validators.required]],
      personalProvince: ['', [Validators.required]],
      personalCity: ['', [Validators.required]],
    });
  }

  

}
