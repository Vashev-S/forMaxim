import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class SpinnerService {
  visible$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  setVisible(visible: boolean) {
    this.visible$.next(visible);
  }
}
