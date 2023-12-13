import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/core/core.index';
import { WebStorage } from 'src/app/core/services/storage/web.storage';

interface returndata {
  message: string | null;
  status: string | null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public routes = routes;
  public CustomControler: any;
  public subscription: Subscription = new Subscription();
  public Toggledata = true;
  public notificationMessage: string | null = null;
  
  form = new UntypedFormGroup({
    email: new UntypedFormControl('AlexJS@fitflex.com', [Validators.required]),
    password: new UntypedFormControl('Aa123456@', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data !== null && data !== undefined && data !== 0) {
        this.CustomControler = data;
        console.log(this.CustomControler);
        this.showNotification(this.CustomControler);
      }
    });    
  }

  ngOnInit() {
    // this.storage.Checkuser();
    localStorage.removeItem('LoginData');
  }

  submit() {
    this.storage.Login(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }

  private showNotification(data: returndata) {
    if (data && data.status === 'false') {
      this.notificationMessage = data.message;
    } else {
      this.notificationMessage = null;
    }
  }
}
