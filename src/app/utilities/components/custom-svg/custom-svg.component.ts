import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


/**
 * CustomSvgComponent is a component that displays an SVG image fetched from a URL.
 * It allows customization of the SVG color.
 * 
 * @param svgUrl - The URL of the SVG image.
 * @param color - The color of the SVG image.
 */
@Component({
  selector: 'custom-svg',
  template: '<div [innerHTML]="safeSvgElement"></div>',
})
export class CustomSvgComponent implements OnChanges {
  @Input() svgUrl?: string;
  @Input() color?: string;

  safeSvgElement?: SafeHtml; // Updated type to SafeHtml

  constructor(private http: HttpClient, 
              private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('svgUrl' in changes || 'color' in changes) {
      this.getSvg();
    }
  }

  getSvg(): void {
    if (!this.svgUrl) return;

    this.http.get(this.svgUrl, { responseType: 'text' }).subscribe({
      next: (data) => {
        let svgElement = data;
        if (this.color) {
          svgElement = svgElement.replace(/fill=".*?"/g, `fill="${this.color}"`);
        }
        this.safeSvgElement = this.sanitizer.bypassSecurityTrustHtml(svgElement);
      },
      error: (error) => {
        console.error('Error fetching SVG: ', error);
      }
    });
  }
}
