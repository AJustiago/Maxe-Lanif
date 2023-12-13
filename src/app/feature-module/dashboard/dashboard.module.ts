import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, EmployeeDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
  ]
})
export class DashboardModule { }
