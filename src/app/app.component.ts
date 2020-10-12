import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer';

  max = 1;
  current = 0;

  start(): void {
    const interval = Observable.interval(100);

    interval
      .takeWhile((_: any) => !this.isFinished)
      .do(() => this.current += 0.1)
      .subscribe();
  }

  finish(): void {
    this.current = this.max;
  }

  reset(): void {
    this.current = 0;
  }

  // Getters to prevent NaN errors on the progress bar

  get maxVal(): number {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal(): number {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  //

  get isFinished(): boolean {
    return this.currentVal >= this.maxVal;
  }

}
