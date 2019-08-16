import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientsDialogComponent } from './recipients-dialog.component';

describe('RecipientsDialogComponent', () => {
  let component: RecipientsDialogComponent;
  let fixture: ComponentFixture<RecipientsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
