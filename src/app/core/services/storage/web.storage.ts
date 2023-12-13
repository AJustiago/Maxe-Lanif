import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


interface register {
  email: string | '';
  password: string | '';
  confirmPassword: string | null;
}
interface login  {
  email:string;
  password:string 
}
interface returndata  {
  message: string | '';
  status: string | 'true'; 
}

@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<string|number|returndata>(0);
  public Createaccountvalue = new BehaviorSubject<number|string>(0);
  public Forgotpasswordvalue = new BehaviorSubject<number|string|register>(0);
  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: register): void {
    const isEmailValid = this.validateEmail(uservalue.email);
  
    if (!isEmailValid) {
      this.Createaccountvalue.next('Invalid email address');
      return;
    }
  
    const Rawdata: string | null = localStorage.getItem('Loginusers');
    let Pdata: Array<register> = [];
  
    if (Rawdata) {
      console.log('Rawdata:', Rawdata);
      try {
        Pdata = JSON.parse(Rawdata);
      } catch (error) {
        console.error('Error parsing Rawdata:', error);
      }
    }
  
    const existingUser = Pdata.find((f: register) => f.email === uservalue.email);
  
    if (existingUser) {
      this.Createaccountvalue.next('This email already exists');
    } else {
      const isPasswordValid = this.validatePassword(uservalue.password);
  
      if (!isPasswordValid) {
        this.Createaccountvalue.next('Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long');
      } else {
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);
        this.router.navigate(['/login']);
      }
    }
  }
  
  private validateEmail(email: string): boolean {
    // Implement your email validation logic here
    // For example, you can use a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public Login(uservalue: register): void {
    const returndata = { message: '', status: '' };
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(uservalue.email)) {
      returndata.message = 'Invalid Email Address';
      returndata.status = 'false';
      this.Loginvalue.next(returndata);
      return;
    }
  
    // Password validation
    const isPasswordValid = this.validatePassword(uservalue.password);
  
    if (!isPasswordValid) {
      returndata.message = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long';
      returndata.status = 'false';
      this.Loginvalue.next(returndata);
      return;
    }
  
    const data: string | null = localStorage.getItem('Loginusers');
    const Pdata: register[] = JSON.parse(data || '[]');
    const user: register | undefined = Pdata.find(({ email }) => email === uservalue.email);
  
    if (user) {
      // Account with the provided email exists
      if (user.password === uservalue.password) {
        // Password is correct
        this.Createtoken(uservalue);
        this.Loginvalue.next('Login success');
        localStorage.setItem('logintime', Date());
        this.router.navigate(['/dashboard/admin']);
        this.Loginvalue.next(0);
      } else {
        // Password is incorrect
        returndata.message = 'Incorrect Password';
        returndata.status = 'false';
        this.Loginvalue.next(returndata);
      }
    } else {
      // Account with the provided email does not exist
      returndata.message = 'Account Does Not Exist';
      returndata.status = 'false';
      this.Loginvalue.next(returndata);
    }
  }
  
  
  private validatePassword(password: string): boolean {
    // Implement your password validation logic here
    // For example, you can check the length or use a regex for more complex rules
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  }  

  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  public Createtoken(uservalue:register) {
    const result = 'ABCDEFGHI' + uservalue.email + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    const users = localStorage.getItem('Loginusers');
    if (users === null) {
      const password = [
        {
          email: 'AlexJS@fitflex.com',
          password: 'Aa123456@',
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem('Loginusers', jsonData);
    }
  }


  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue:register): void {
    const Rawdata:string|null = localStorage.getItem('Loginusers');
    let Pdata: [] = [];
    Pdata = JSON.parse(Rawdata||'');
    const Eresult:Array<login>|undefined = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email Not Valid');
    }
  }
}
