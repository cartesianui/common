import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized:boolean = false;
  public navItems: INavData[];

  public constructor(private route:ActivatedRoute) {
    this.navItems = route.snapshot.data['navItems'];
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
