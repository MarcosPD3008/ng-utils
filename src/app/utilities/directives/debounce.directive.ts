import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

/**
 * DebounceDirective is a custom directive in Angular that adds debounce functionality to an input element.
 *
 * @remarks
 * This directive listens for keyup events on the input element and emits the input value after a specified debounce time.
 *
 * @example
 * ```html
 * <input type="text" (debounce)="handleDebounce($event)" />
 * ```
 *
 * @publicApi
 */
@Directive({
  selector: '[debounce]'
})
export class DebounceDirective {
  public NewEventSubject = new Subject<string>();
  public NewEvent: Observable<string>;

  @Input()
  public debounceTime = 300; //Time in milliseconds

  @Output()
  public debounce = new EventEmitter<string>();

  @HostListener('keyup',['$event.target.value'])
  public OnKeyUp(ev: string) {
    this.NewEventSubject.next(ev);
  }

  constructor() {
    this.NewEvent = this.NewEventSubject.pipe(debounce(() => interval(this.debounceTime)));
    this.NewEvent.subscribe(value => {
      this.debounce.emit(value);
    });
  }
}