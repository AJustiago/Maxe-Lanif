import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent {
  constructor(private toastr: ToastrService) {}
  public routes = routes;
  public isHidden: boolean[] = [false];
  toggleVisibility(index: number) {
    this.isHidden[index] = !this.isHidden[index];
  }
}
