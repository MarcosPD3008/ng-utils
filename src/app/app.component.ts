import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilitiesModule } from './utilities/utilities.module';
import { NavbarComponent } from './web/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UtilitiesModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-utils';
}
