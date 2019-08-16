import {Component, Input, OnInit, PipeTransform} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {startWith} from 'rxjs/internal/operators/startWith';
import {map, tap} from 'rxjs/operators';
import {CreateEventService} from '../create-event.service';

let subscribers: string[] = [];

function search(text: string, pipe: PipeTransform): string[] {
  return subscribers.filter(subscriber => {
    const term = text.toLowerCase();
    return subscriber.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-recipients-dialog',
  templateUrl: './recipients-dialog.component.html',
  styleUrls: ['./recipients-dialog.component.css']
})
export class RecipientsDialogComponent implements OnInit {
  @Input() service;
  @Input() instance;

  set subscribers(newValue: string[]) {
    subscribers = newValue;
    this.filter.setValue(this.filter.value);
  }

  get subscribers(): string[] {
    return subscribers;
  }
  loading = false;

  subscribers$: Observable<string[]>;
  filter = new FormControl('');

  constructor(
    public activeModal: NgbActiveModal,
    public pipe: DecimalPipe,
    private createEventService: CreateEventService,
  ) {
    this.subscribers$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, this.pipe))
    );
  }

  ngOnInit() {
    this.loading = true;
    this.createEventService.getSubscribersForInstance(this.service, this.instance)
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe(({ result }) => this.subscribers = result.subscribers);
  }

  close() {
    this.activeModal.close();
    this.subscribers = [];
  }
}
