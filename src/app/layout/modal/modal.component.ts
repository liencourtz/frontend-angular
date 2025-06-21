import { Component, EventEmitter, Input, Output, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ModalData {
  title: string;
  message: string;
  success: boolean;
  details?: any;
  showConfirm?: boolean;
  confirmText?: string;
}

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit {
 
  @Input() modalId: string = 'responseModal';
  @Input() modalData: ModalData = {
    title: '',
    message: '',
    success: true
  };
  
  @Output() confirmed = new EventEmitter<void>();
  
  showDetails: boolean = false;
  private modalInstance: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verifica se está no browser antes de acessar o DOM
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById(this.modalId);
      if (modalElement && typeof bootstrap !== 'undefined') {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
    }
  }

  show(data: ModalData) {
    this.modalData = data;
    this.showDetails = false;
    
    if (isPlatformBrowser(this.platformId)) {
      // Se o modal ainda não foi inicializado, tenta inicializar
      if (!this.modalInstance && typeof bootstrap !== 'undefined') {
        const modalElement = document.getElementById(this.modalId);
        if (modalElement) {
          this.modalInstance = new bootstrap.Modal(modalElement);
        }
      }
      
      if (this.modalInstance) {
        this.modalInstance.show();
      }
    }
  }

  hide() {
    if (isPlatformBrowser(this.platformId) && this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  onConfirm() {
    this.confirmed.emit();
  }
}