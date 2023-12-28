import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoginService } from './services/login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    RouterOutlet,
    NgxUiLoaderModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';
  ngOnInit(): void {
    //initFlowbite();
  }

  constructor(public loginService: LoginService){

  }
}
