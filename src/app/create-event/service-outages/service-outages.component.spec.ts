import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOutagesComponent } from './service-outages.component';

describe('ServiceOutagesComponent', () => {
  let component: ServiceOutagesComponent;
  let fixture: ComponentFixture<ServiceOutagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOutagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOutagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
