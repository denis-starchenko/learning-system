import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[lsTooltip]'
})
export class TooltipDirective {
  @Input('lsTooltip') text: string;
  private tooltip: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.createTooltipTemplate();
    this.setTooltipPosition(this.el.nativeElement);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    this.removeClass(this.el.nativeElement, 'hide-row-content');
  }

  createTooltipTemplate(): void {
    this.tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.text)
    );
    this.renderer.appendChild(document.body, this.tooltip);
    this.addClass(this.el.nativeElement, 'hide-row-content');
    this.addClass(this.tooltip, 'tooltip');
  }

  setTooltipPosition(element): void {
    const height = element.offsetTop  + element.offsetHeight * 2 + 20 + 'px';
    this.tooltip.style.top = height;
  }

  addClass(element, className): void {
    this.renderer.addClass(element, className);
  }

  removeClass(element, className): void {
    this.renderer.removeClass(element, className);
  }
}
