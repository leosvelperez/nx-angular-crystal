import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lib1Component } from 'lib1';
import { Lib2Component } from 'lib2';

@Component({
  selector: 'nac-root',
  standalone: true,
  imports: [RouterOutlet, Lib1Component, Lib2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'nx-angular-crystal';
}
