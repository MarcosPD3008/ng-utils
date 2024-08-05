import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { debounceTime } from 'rxjs';

@Directive({
  selector: '[debounceClick]'
})
export class DebounceClickDirective {
  @Input() debounceTime = 500; // Default debounce time in milliseconds
  @Output() debounceClick = new EventEmitter();

  private clicks = new EventEmitter();
  private subscription: any;

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    )
    .subscribe((e) => this.debounceClick.emit(e));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.emit(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
