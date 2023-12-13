import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { NavigationEnd, Router } from '@angular/router';
import { WebStorage } from 'src/app/core/services/storage/web.storage';
import { routes } from 'src/app/core/helpers/routes/routes';

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  membership: string;
  address: string;
  gender: string;
}

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
})

export class HeaderOneComponent implements OnInit {
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
    private http: HttpClient
  ) 
  {
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

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  logout() {
    localStorage.removeItem('LoginData');
    this.router.navigate(['/login']);
  }

  navigation() {
    this.router.navigate([routes.search]);
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
}
