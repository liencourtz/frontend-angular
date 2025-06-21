import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cpfMask]',
})
export class CpfDirective {
  constructor(
    private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    // Apply CPF mask
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    input.value = value;

    // Put the formatted value back into the control
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }

  }
}
