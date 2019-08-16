import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {merge, Observable, Subject} from 'rxjs';
import {ServiceInterface} from '../interfaces/service.interface';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {filter} from 'rxjs/internal/operators/filter';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerService} from '../services/spinner.service';
import {CreateEventService} from './create-event.service';
import {RecipientsDialogComponent} from './recipients-dialog/recipients-dialog.component';
import {ResultDialogComponent} from "./result-dialog/result-dialog.component";
import {MessageDialogComponent} from "./message-dialog/message-dialog.component";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @ViewChild('services') servicesInput: NgbTypeahead;
  @ViewChild('instances') instanceInput: NgbTypeahead;
  @ViewChild('listIncident') listIncident;

  eventForm = new FormGroup({
    type: new FormControl('outages', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    instance: new FormControl('', []),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', []),
    recipients: new FormControl('', []),
    summary: new FormControl('', [Validators.required]),
    impact: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
  });

  services: ServiceInterface[] = [];
  instances: string[] = [];

  focusService$ = new Subject<string>();
  clickService$ = new Subject<string>();

  focusInstance$ = new Subject<string>();
  clickInstance$ = new Subject<string>();

  resultMessage = '';
  errorMessage = '';

  searchServiceAffected = (text$: Observable<string>) => {
    const debounceText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickService$.pipe(filter(() => !this.servicesInput.isPopupOpen()));
    const inputFocus$ = this.focusService$;

    return merge(debounceText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === ''
        ? this.services.map(service => service.name)
        : this.services
            .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .map(service => service.name)
      ))
    );
  };

  searchInstanceAffected = (text$: Observable<string>) => {
    const debounceText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickInstance$.pipe(filter(() => !this.instanceInput.isPopupOpen()));
    const inputFocus$ = this.focusInstance$;

    return merge(debounceText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === ''
          ? this.instances
          : this.instances.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
      ))
    );
  };

  constructor(
    private createEventService: CreateEventService,
    private spinnerService: SpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.spinnerService.setVisible(true);

    this.createEventService.getServices()
      .subscribe(
        ({result: services}) => this.services = services,
        () => {
          const modalRef = this.modalService.open(MessageDialogComponent);
          modalRef.componentInstance.text = 'Services not updated';
          modalRef.componentInstance.error = true;
          this.spinnerService.setVisible(false);
        });

    this.eventForm.get('service').valueChanges
      .pipe(
        filter(
          value => this.services
            .map(service => service.name)
            .filter(serviceName => serviceName === value).length === 1),
        tap(() => this.spinnerService.setVisible(false))
      )
      .subscribe(
        service => {
          this.spinnerService.setVisible(true);
          this.createEventService
            .getInstancesForService(service)
            .subscribe(
              ({result: instances}) => this.instances = instances,
              () => {
                const modalRef = this.modalService.open(MessageDialogComponent);
                modalRef.componentInstance.text = 'Instance for service not updated';
                modalRef.componentInstance.error = true;
                this.spinnerService.setVisible(false);
              })
        });
  }

  submit() {
    const { start, end, ...otherFields } = this.eventForm.value;

    const form = {
      start: new Date(start).toISOString(),
      end: this.eventForm.value.type !== 'outages' ? new Date(end).toISOString() : '',
      ...otherFields
    };

    this.spinnerService.setVisible(true);

    this.createEventService.createEvent(form)
      .subscribe(
        ({result: event}) => {
          const { id, sys_id } = event;

          this.listIncident.updateList();
          this.openResultDialog(sys_id, id);
        },
        () => {
          const modalRef = this.modalService.open(MessageDialogComponent);
          modalRef.componentInstance.text = 'Event not created';
          modalRef.componentInstance.error = true;
          this.spinnerService.setVisible(false);
        });
  }

  reset() {
    this.eventForm.patchValue({
      type: 'outages',
      service: '',
      instance: '',
      start: '',
      end: '',
      recipients: '',
      summary: '',
      impact: '',
      details: '',
    });
  }

  openResultDialog(sys_id: string, id: string) {
    const modalRef = this.modalService.open(ResultDialogComponent);

    modalRef.componentInstance.sys_id = sys_id;
    modalRef.componentInstance.id = id;
  }

  openRecipients() {
    const modalRef = this.modalService.open(RecipientsDialogComponent);

    modalRef.componentInstance.service = this.eventForm.value.service;
    modalRef.componentInstance.instance = this.eventForm.value.instance;
  }
}
