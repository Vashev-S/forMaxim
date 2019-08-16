import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SpinnerService} from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  branding = 'Notification alert';
  visible = true;

  constructor(
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    document.title = this.branding;
  }

  ngAfterViewInit() {
    setTimeout(() => this.spinnerService.visible$.subscribe(visible => this.visible = visible));
  }
}
