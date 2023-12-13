import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { WebStorage } from 'src/app/core/services/storage/web.storage';

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  membership: string;
  membershipJoin: string;
  address: string;
  gender: string;
  telephone: string;
}

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.scss']
})
export class ClientsProfileComponent implements OnInit {
  public base = '';
  public page = '';
  public routes = routes;
  public miniSidebar = false;
  public baricon = false;
  public user: UserData | null = null;

  constructor(
    private sideBar: SideBarService,
    private router: Router,
    private web: WebStorage,
    private http: HttpClient,
  ){
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        if (this.base === 'components' || this.page === 'tasks' || this.page === 'email') {
          this.baricon = false;
          localStorage.setItem('baricon', 'false');
        } else {
          this.baricon = true;
          localStorage.setItem('baricon', 'true');
        }
      }
    });
    if (localStorage.getItem('baricon') === 'true') {
      this.baricon = true;
    } else {
      this.baricon = false;
    }
  }
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
    const loginData = this.exportLoginData();

    if (loginData) {
      const userEmail = this.removeFormatFromLoginData(loginData);
      this.getUserData(userEmail);
    }
  }

  private getUserData(email: string): void {
    this.http.get<{ data: UserData[] }>('assets/JSON/user-data.json').subscribe(
      (response) => {
        const userData = response.data;
        const user = userData.find((u) => u.email === email);

        if (user) {
          this.user = user;
          console.log('User Data:', user);
        } else {
          console.log('User not found.');
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  membershipValue(value: string): void {
    const data = { email: this.user?.email, value };

    this.http.post('http://127.0.0.1:5399/updateMembership', data).subscribe(
      () => {
        window.location.reload();
      },
      (postError) => {
        console.error('Error adding user', postError);
      }
    );
  }

  getRemainingDate(): string | null {
    if (this.user && this.user.membershipJoin) {
      const currentDate = new Date();
      const joinDate = this.parseDateString(this.user.membershipJoin);
  
      const monthsDiff = (currentDate.getFullYear() - joinDate.getFullYear()) * 12 +
        (currentDate.getMonth() - joinDate.getMonth());
  
      const remainingMonths = 24 - monthsDiff;
  
      if (remainingMonths > 0) {
        const remainingDate = new Date(joinDate.getFullYear(), joinDate.getMonth() + remainingMonths, joinDate.getDate());
        return this.formatDate(remainingDate);
      }
    }
  
    return null;
  }
  
  parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split(' ');
    const monthIndex = this.getMonthIndex(month);
    return new Date(parseInt(year), monthIndex, parseInt(day));
  }
  
  getMonthIndex(month: string): number {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months.indexOf(month);
  }
  
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2); 
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  
  
}
