import { Component, OnDestroy } from "@angular/core";
import {  UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { routes } from "src/app/core/helpers/routes/routes";
import { WebStorage } from "src/app/core/services/storage/web.storage";
import { HttpClient } from '@angular/common/http';

interface UserData {
  email: string | '';
  password: string | '';
  confirmPassword: string | '';
  name: string | '';
  address: string | '';
  gender: string | '';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy  {
  public isvalidconfirmpassword = false;
  public subscription: Subscription;
  public CustomControler!: number|string;
  public routes = routes;
  form = new UntypedFormGroup({
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
    password: new UntypedFormControl("", [Validators.required]),
    confirmPassword: new UntypedFormControl("", [Validators.required]),
    name: new UntypedFormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    gender: new UntypedFormControl("", [Validators.required]),
    address: new UntypedFormControl("", [Validators.required]),
    telephone: new UntypedFormControl("", [
      Validators.required,
      Validators.pattern(/^0[0-9]{11}$/),
      Validators.minLength(12),
      Validators.maxLength(13),
    ]),
    birthdate: new UntypedFormControl("", [Validators.required, this.ageValidator]),
  });

  ageValidator(control: any) {
    const birthdate = new Date(control.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdate.getFullYear();
  
    // Check if birthdate is not provided or age is less than 10
    if (!control.value || age < 10) {
      return { ageInvalid: true };
    }
  
    return null;
  }

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage, private http: HttpClient) {
    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  async submit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.isvalidconfirmpassword = true;
    } else {
      this.isvalidconfirmpassword = false;

      const newUser = {
        email: this.form.value.email,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        name: this.form.value.name,
        gender: this.form.value.gender,
        address: this.form.value.address,
        telephone: this.form.value.telephone,
        birthdate: this.form.value.birthdate,
      };

      const email = {
        email: this.form.value.email
      }

    if (this.form.valid) {
        try {
          await this.http.post('http://127.0.0.1:5399/register', newUser).subscribe(
            () => {
              this.storage.Createaccount(this.form.value);
            },
            (postError) => {
              console.error('Error adding user', postError);
            }
          );
          await this.http.post('http://127.0.0.1:5399/addEmergency', email).subscribe(
            () => {
              console.log('Success adding to Emergency')
            },
            (postError) => {
              console.error('Error adding user Emergency', postError);
            }
          )
  
          console.log(this.form.value);
          this.storage.Createaccount(this.form.value);
        } catch (error) {
          console.error('Error adding user', error);
        }
      }
    else {
        console.error('Form is not valid');
      }
    } 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
