import { ElementRef } from '@angular/core';
import { TextOverflowBtnDirective } from './text-overflow-btn.directive';

describe('TextOverflowBtnDirective', () => {
  it('should create an instance', () => {
    const directive = new TextOverflowBtnDirective({} as ElementRef);
    expect(directive).toBeTruthy();
  });
});
