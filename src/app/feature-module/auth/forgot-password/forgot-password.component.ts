import { Component } from "@angular/core";
import {  UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { routes } from "src/app/core/helpers/routes/routes";
import { WebStorage } from "src/app/core/services/storage/web.storage";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public routes = routes;
  form = new UntypedFormGroup({
    email: new UntypedFormControl("", [Validators.required, Validators.email]),
  });
  public CustomControler!: number;
  public subscription!: Subscription ;

  constructor(private storage: WebStorage) { }
  get f() {
    return this.form.controls;
  }
  
  submit() {
    this.CustomControler = 0;
    this.storage.Forgotpassword(this.form.value);
  }
}
