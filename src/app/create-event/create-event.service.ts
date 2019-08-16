import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../services/spinner.service';
import {ServiceInterface} from '../interfaces/service.interface';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {EventInterface} from '../interfaces/event.interface';

@Injectable()
export class CreateEventService {
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
  ) { }

  getServices(): Observable<{ result: ServiceInterface[] }> {
    return this.http
      .get<{ result: ServiceInterface[] }>('api/emce2/notificationalert/notifications/services')
      .pipe(
        tap(() => this.spinnerService.setVisible(false))
      )
  }

  getInstancesForService(service: string): Observable<{ result: string[] }> {
    return this.http
      .get<{ result: string[] }>(`api/emce2/notificationalert/notifications/services/${service}/instances`)
      .pipe(
        tap(() => this.spinnerService.setVisible(false))
      )
  }

  createEvent(form: any): Observable<{ result: EventInterface }> {
    return this.http
      .post<{ result: EventInterface }>(`api/emce2/notificationalert/notifications/${form.type}`, form)
      .pipe(
        tap(() => this.spinnerService.setVisible(false))
      )
  }

  getSubscribersForInstance(service: string, instance: string) {
    if (instance) {
      return this.http
        .get<{ result: { subscribers: [string] } }>(`api/emce2/notificationalert/notifications/services/${service}/instances/${instance}/subscribers`);
    } else {
      return this.http
        .get<{ result: { subscribers: [string] } }>(`api/emce2/notificationalert/notifications/services/${service}/subscribers`);
    }
  }

  getIncidents(): Observable<any> {
    return this.http.get('api/now/table/incident_alert?sysparm_limit=100');
  }
}
