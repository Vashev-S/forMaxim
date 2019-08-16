import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {
  @Input() sys_id;
  @Input() id;

  constructor(
    public activeModal: NgbActiveModal,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close();
  }

  getLinkToIncident(sysId: string) {
    return sysId
      ? `${this.appService.getHost()}incident_alert.do?sys_id=${sysId}&sysparm_record_target=incident_alert`
      : '#';
  }
}
