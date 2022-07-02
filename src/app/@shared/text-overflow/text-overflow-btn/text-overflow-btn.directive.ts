import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextOverflowBtn]',
})
export class TextOverflowBtnDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.handleOverflowElement();
  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    this.handleOverflowElement();
  }

  isHorizontallyOverflown() {
    let el = this.elRef.nativeElement.children[0];
    return el.scrollWidth > el.clientWidth;
  }

  handleOverflowElement() {
    let el = this.elRef.nativeElement.children[1];
    if (!el) return;

    if (this.isHorizontallyOverflown()) {
      this.showChild(el);
    } else {
      this.hideChild(el);
    }
  }

  showChild(el: HTMLDivElement) {
    let classList = el.classList;
    classList.replace('hidden', 'inline-block');
    el.className = classList.toString();
  }

  hideChild(el: HTMLDivElement) {
    let classList = el.classList;
    classList.replace('inline-block', 'hidden');
    el.className = classList.toString();
  }
}
