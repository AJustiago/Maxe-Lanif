import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/sharedIndex';
import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { SideMenuOneComponent } from './common/side_menus/side-menu-one/side-menu-one.component';
import { HeaderOneComponent } from './common/headers/header-one/header-one.component';
import { SettingsMenuComponent } from './common/settings-menu/settings-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FeatureModuleComponent,
    SideMenuOneComponent,
    HeaderOneComponent,
    SettingsMenuComponent,
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule,
    SharedModule,
    RouterModule,
  ],
})
export class FeatureModuleModule {}
