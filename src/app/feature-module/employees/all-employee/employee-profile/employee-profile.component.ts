import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';
import { Router } from '@angular/router';

interface data {
  value: string;
}

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  membership: string;
  address: string;
  gender: string;
  telephone: string;
  birthDate: string;
  role: string;
  DOJ: string;
  membershipJoin: string;
  personalTrainer: string;
}

interface FamilyMember {
  email: string;
  primaryName: string;
  primaryRelationship: string;
  primaryPhone: string;
  secondaryName: string;
  secondaryRelationship: string;
  secondaryPhone: string;
  familyName: string;
  familyRelationship: string;
  familyPhone: string;
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  public selectedValue11 = '';
  public routes = routes;
  public user: UserData | null = null;
  public familyData: FamilyMember | null = null;  
  bsValue = new Date();
  public addEmployeeForm!: FormGroup;
  public profileForm!: FormGroup;
  public familyForm!: FormGroup;
  public emergencyContactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  exportLoginData(): string | null {
    return localStorage.getItem('LoginData');
  }

  removeFormatFromLoginData(loginData: string): string {
    const regex = /ABCDEFGHI(.+?)ghijklmnopqrsz01234567/;
    const match = regex.exec(loginData);

    if (match && match.length > 1) {
      const email = match[1];
      return email;
    } else {
      return loginData;
    }
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [ this.user?.name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      birthDate: [ '', [Validators.required, this.ageValidator]],
      gender: [ this.user?.gender, Validators.required],
      address: [ this.user?.address, Validators.required],
      telephone: [this.user?.telephone, [Validators.required,
                      Validators.pattern(/^0[0-9]{11}$/),
                      Validators.minLength(12),
                      Validators.maxLength(13),]],
    });

    this.familyForm = this.formBuilder.group({
      familyName: [this.familyData?.familyName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      familyRelationship: [this.familyData?.familyRelationship, Validators.required],
      familyPhone: [this.familyData?.familyPhone, [Validators.required,
                          Validators.pattern(/^0[0-9]{11}$/),
                          Validators.minLength(12),
                          Validators.maxLength(13),]],
    });

    this.emergencyContactForm = this.formBuilder.group({
      primaryName: [this.familyData?.primaryName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      primaryRelationship: [this.familyData?.primaryRelationship, Validators.required],
      primaryPhone: [this.familyData?.primaryPhone, [
        Validators.required,
        Validators.pattern(/^0[0-9]{11}$/),
        Validators.minLength(12),
        Validators.maxLength(13),
      ]],
      secondaryName: [this.familyData?.secondaryName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      secondaryRelationship: [this.familyData?.secondaryRelationship, Validators.required],
      secondaryPhone: [this.familyData?.secondaryPhone, [
        Validators.required,
        Validators.pattern(/^0[0-9]{11}$/), 
        Validators.minLength(12),
        Validators.maxLength(13),
      ]],
    });
    

    const loginData = this.exportLoginData();

    if (loginData) {
      const userEmail = this.removeFormatFromLoginData(loginData);
      this.getUserData(userEmail);
      this.getFamilyData(userEmail);
    }
  }

  ageValidator(control: any) {
    const birthdate = new Date(control.value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdate.getFullYear();

    if (!control.value || age < 10) {
      return { ageInvalid: true };
    }
  
    return null;
  }

  private getUserData(email: string): void {
    this.http.get<{ data: UserData[] }>('assets/JSON/user-data.json').subscribe(
      (response) => {
        const userData = response.data;
        const user = userData.find((u) => u.email === email);

        if (user) {
          this.user = user;
          console.log('User Data:', user);
          // Set form values
          this.profileForm.patchValue({
            name: user.name,
            birthDate: user.birthDate,
            gender: user.gender,
            address: user.address,
            telephone: user.telephone,
          });
        } else {
          console.log('User not found.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  private getFamilyData(email: string): void {
    this.http.get<{ data: FamilyMember[] }>('assets/JSON/user-emergency-contact.json').subscribe(
      (response) => {
        const familyData = response.data;
        const familyDatas = familyData.find((u) => u.email === email);
        if (familyDatas) {
          this.familyData = familyDatas;
          console.log('User Data:', familyDatas);
          // Set form values
          this.familyForm.patchValue({
            familyName: familyDatas.familyName,
            familyRelationship: familyDatas.familyRelationship,
            familyPhone: familyDatas.familyPhone,
          });
        } else {
          console.log('User not found.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  selectedList11: data[] = [{ value: 'Male' }, { value: 'Female' }];

  submitFormProfile() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      const payload = { 'email' : this.user?.email, formData}
      const apiUrl = 'http://127.0.0.1:5399/profileUpdate';

      this.http.post(apiUrl, payload).subscribe(
        (response) => {
          console.log('Profile form submitted successfully', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error submitting profile form:', error);
        }
      );
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  submitFormFamily() {
    if (this.familyForm.valid) {
      const formData = this.familyForm.value;
      const payload = { 'email' : this.user?.email, formData}
      const apiUrl = 'http://127.0.0.1:5399/familyUpdate';

      this.http.post(apiUrl, payload).subscribe(
        (response) => {
          console.log('Family form submitted successfully', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error submitting family form:', error);
        }
      );
    } else {
      this.familyForm.markAllAsTouched();
    }
  }

  submitFormEmergency() {
    if (this.emergencyContactForm.valid) {
      const formData = this.emergencyContactForm.value;
      const payload = { 'email' : this.user?.email, formData}
      const apiUrl = 'http://127.0.0.1:5399/emergencyUpdate';

      this.http.post(apiUrl, payload).subscribe(
        (response) => {
          console.log('Emergency contact form submitted successfully', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error submitting emergency contact form:', error);
        }
      );
    } else {
      this.emergencyContactForm.markAllAsTouched();
    }
  }
}
