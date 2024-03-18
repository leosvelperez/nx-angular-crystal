import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyLib1Component } from 'my-lib1';
import { MyLib2Component } from 'my-lib2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyLib1Component, MyLib2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-ng-app';
}
