import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({ selector: '[truncate]' })
export class TruncateStringDirective {
    @Input() truncate: number = 100;
    @Input() behavior: TruncateBehavior = TruncateBehavior.onHover;

    private originalText: string = '';
    private truncatedText: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.originalText = this.el.nativeElement.textContent;
        if (this.originalText.length > this.truncate) {
            this.truncatedText = this.originalText.substring(0, this.truncate) + '...';
            this.renderer.setProperty(this.el.nativeElement, 'textContent', this.truncatedText);
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (this.behavior === TruncateBehavior.onHover) {
            this.renderer.setProperty(this.el.nativeElement, 'textContent', this.originalText);
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.behavior === TruncateBehavior.onHover) {
            this.renderer.setProperty(this.el.nativeElement, 'textContent', this.truncatedText);
        }
    }

    @HostListener('click') onClick() {
        if (this.behavior === TruncateBehavior.onClick) {
            const currentText = this.el.nativeElement.textContent;
            const newText = currentText === this.truncatedText ? this.originalText : this.truncatedText;
            this.renderer.setProperty(this.el.nativeElement, 'textContent', newText);
        }
    }
}

export enum TruncateBehavior {
    onHover = 'onHover',
    onClick = 'onClick',
}
