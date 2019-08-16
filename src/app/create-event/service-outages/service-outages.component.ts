import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateEventService} from '../create-event.service';
import {tap} from 'rxjs/operators';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-service-outages',
  templateUrl: './service-outages.component.html',
  styleUrls: ['./service-outages.component.css']
})
export class ServiceOutagesComponent implements OnInit {
  incidents = [];
  incidentsScheduled = [];
  incidentsUnscheduled = [];

  incidentsForAlm = [];
  incidentsScheduledForAlm = [];
  incidentsUnscheduledForAlm = [];


  loading = false;
  forAlm = 'ALM';

  constructor(
    private createEventService: CreateEventService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.loading = true;
    const incidents$ = this.createEventService.getIncidents()
      .pipe(tap(() => this.loading = false));

    incidents$.subscribe(({result: incidents}) => {
      this.incidents = incidents;
      this.incidentsScheduled = incidents.filter(incident => incident.u_scheduled_type === 'Scheduled');
      this.incidentsUnscheduled = incidents.filter(incident => incident.u_scheduled_type === 'Unscheduled');

      this.incidentsForAlm = this.incidents.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
      this.incidentsScheduledForAlm = this.incidentsScheduled.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
      this.incidentsUnscheduledForAlm = this.incidentsUnscheduled.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
    });
  }

  getLinkToIncident(sysId: string) {
    return `${this.appService.getHost()}incident_alert.do?sys_id=${sysId}&sysparm_record_target=incident_alert`;
  }

  updateList() {
    this.loading = true;
    const incidents$ = this.createEventService.getIncidents()
      .pipe(tap(() => this.loading = false));

    incidents$.subscribe(({result: incidents}) => {
      this.incidents = incidents;
      this.incidentsScheduled = incidents.filter(incident => incident.u_scheduled_type === 'Scheduled');
      this.incidentsUnscheduled = incidents.filter(incident => incident.u_scheduled_type === 'Unscheduled');

      this.incidentsForAlm = this.incidents.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
      this.incidentsScheduledForAlm = this.incidentsScheduled.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
      this.incidentsUnscheduledForAlm = this.incidentsUnscheduled.filter(incident => incident.u_services_affected.value === '2f5486910f5706808db26ab8b1050e14');
    });
  }
}
