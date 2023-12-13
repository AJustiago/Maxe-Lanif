import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-activites-view',
  templateUrl: './activites-view.component.html',
  styleUrls: ['./activites-view.component.scss']
})
export class ActivitesViewComponent {
  public routes = routes;
}
