import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneNumberDirective {

  constructor(
    private ngControl: NgControl
  ) { }
  
  @HostListener('input', ['$event'])
  onInput(event: any) {

    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    // Limita a 13 dígitos
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    let formattedValue = value;

    // 13 dígitos: XX (XX) XXXXX-XXXX
    if (value.length >= 12) {
      formattedValue = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4');
    }
    // 11 dígitos: XX (XX) XXXXX-XXXX (tratando como código país + DDD)
    else if (value.length === 11) {
      formattedValue = value.replace(/(\d{2})(\d{2})(\d{5})(\d{2})/, '$1 ($2) $3-$4');
    }
    // Durante a digitação - formatação progressiva
    else if (value.length >= 9) {
      formattedValue = value.replace(/(\d{2})(\d{2})(\d{5})/, '$1 ($2) $3');
    } else if (value.length >= 6) {
      formattedValue = value.replace(/(\d{2})(\d{2})(\d{2})/, '$1 ($2) $3');
    } else if (value.length >= 4) {
      formattedValue = value.replace(/(\d{2})(\d{2})/, '$1 ($2)');
    } else if (value.length >= 2) {
      formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1 ($2');
    }

    input.value = formattedValue;
    
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(formattedValue, { emitEvent: false });
    }

  }

}
