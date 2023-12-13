import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { AuthService } from '../core/services/auth/auth.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeatureModuleComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'apps',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'employees',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path: 'clients',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'projects',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'leads',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./leads/leads.module').then((m) => m.LeadsModule),
      },
      {
        path: 'tickets',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'sales',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'accounting',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
      {
        path: 'payroll',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./payroll/payroll.module').then((m) => m.PayrollModule),
      },
      {
        path: 'policies',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./policies/policies.module').then((m) => m.PoliciesModule),
      },
      {
        path: 'reports',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'performance',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./performance/performance.module').then(
            (m) => m.PerformanceModule
          ),
      },
      {
        path: 'goals',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./crosshairs/crosshairs.module').then(
            (m) => m.CrosshairsModule
          ),
      },
      {
        path: 'training',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./training/training.module').then((m) => m.TrainingModule),
      },
      {
        path: 'promotion',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./promotion/promotion.module').then((m) => m.PromotionModule),
      },
      {
        path: 'resignation',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./resignation/resignation.module').then(
            (m) => m.ResignationModule
          ),
      },
      {
        path: 'termination',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./termination/termination.module').then(
            (m) => m.TerminationModule
          ),
      },
      {
        path: 'assets',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./assets/assets.module').then((m) => m.AssetsModule),
      },
      {
        path: 'knowledgebase',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./knowledgebase/knowledgebase.module').then(
            (m) => m.KnowledgebaseModule
          ),
      },
      {
        path: 'activities',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
      },
      {
        path: 'users',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'settings',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'subscriptions',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./subscriptions/subscriptions.module').then(
            (m) => m.SubscriptionsModule
          ),
      },
      {
        path: 'pages',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'components',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'forms',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'tables',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpModule),
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
      import('./auth/lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./auth/error404/error404.module').then((m) => m.Error404Module),
  },
  {
    path: '500',
    loadChildren: () =>
      import('./auth/error500/error500.module').then((m) => m.Error500Module),
  },
  { path: '**', redirectTo: 'admin/404' },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./jobs/jobs.module').then((m) => m.JobsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
