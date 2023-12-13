import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import { routes } from "src/app/core/helpers/routes/routes";
import Swiper from 'swiper';


/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];

};

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  membership: string;
  address: string;
  gender: string;
  membershipJoin: string;
}

interface CarouselItem {
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
}

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit{
  public carouselItems = [
    {
      imageUrl: 'assets/img/carousel/Carousel_1.jpg',
      altText: 'Gym_1',
    },
    {
      imageUrl: 'assets/img/carousel/Carousel_2.jpg',
      altText: 'Gym_2',
    },
    {
      imageUrl: 'assets/img/carousel/Carousel_3.jpg',
      altText: 'Gym_3',
    }
  ];

  // Chart

  @ViewChild("chart") chart: ChartComponent | any;
  @ViewChild("swiperContainer", { static: false }) swiperContainer: Element | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public layoutWidth = '1';
  public routes = routes;
  public user: UserData | null = null;
  constructor(
    private http: HttpClient,
    private renderer: Renderer2
  ) 
  {
    this.chartOptions2 = {
      series: [
        {
          name: "Attendance",
          data: [20, 13, 9, 10, 19, 15, 14, 21, 19, 2, 9, 8],
          color: '#fc6075',
        },
      ],
      series1: [
        {
          name: "Attendance",
          data: [],
          color: '#fc6075',
        },
      ],
      chart: {
        type: "line",
        height: 350
      },
      grid: {
        xaxis: {
            lines: {
                show: false
            }
        },   
        yaxis: {
            lines: {
                show: true
            }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
    };
    this.chartOptions1 = {
      series: [
        {
          name: "series1",
          data: [50, 75, 50, 75, 50, 75, 100],
          color: '#ff9b44',

        },
        {
          name: "series2",
          data: [95, 70, 40, 65, 40, 45, 41],
          color: '#fc6075',
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      grid: {
        xaxis: {
            lines: {
                show: false
            }
        },   
        yaxis: {
            lines: {
                show: true
            }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
        
      },
    };
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

  getRemainingMonths(): number {
    if (this.user && this.user.membershipJoin) {
      const currentDate = new Date();
      const joinDate = this.parseDateString(this.user.membershipJoin);
  
      const monthsDiff = (currentDate.getFullYear() - joinDate.getFullYear()) * 12 +
        (currentDate.getMonth() - joinDate.getMonth());
  
      const remainingMonths = 24 - monthsDiff;
  
      return remainingMonths > 0 ? remainingMonths : 0;
    }
  
    return 0;
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

  ngOnInit() {
    const loginData = this.exportLoginData();

    if (loginData) {
      const userEmail = this.removeFormatFromLoginData(loginData);
      this.getUserData(userEmail);
    }
  }
  
  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    setTimeout(() => {
      const swiper = new Swiper(this.swiperContainer.nativeElement, {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });

      const carouselItems = [
        {
          imageUrl: 'assets/img/carousel/Carousel_1.jpeg',
          altText: 'Gym_1',
        },
        {
          imageUrl: 'assets/img/carousel/Carousel_2.jpeg',
          altText: 'Gym_2',
        },
        {
          imageUrl: 'assets/img/carousel/Carousel_3.jpeg',
          altText: 'Gym_3',
        },
        {
          imageUrl: 'assets/img/carousel/Carousel_4.jpeg',
          altText: 'Gym_4',
        }
      ];

      carouselItems.forEach((item, index) => {
        const imgElement = this.renderer.createElement('img');
        this.renderer.setAttribute(imgElement, 'src', item.imageUrl);
        this.renderer.setAttribute(imgElement, 'alt', item.altText);
        this.renderer.setStyle(imgElement, 'height', '390px');

        const swiperSlide = this.renderer.createElement('div');
        this.renderer.addClass(swiperSlide, 'swiper-slide');
        this.renderer.appendChild(swiperSlide, imgElement);

        this.renderer.appendChild(this.swiperContainer.nativeElement.querySelector('.swiper-wrapper'), swiperSlide);
      });
    });
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
