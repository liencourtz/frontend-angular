import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  
export class ModalComponent {
 
  @Input() modalId: string = 'responseModal';
  @Input() modalData: ModalData = {
    title: '',
    message: '',
    success: true
  };
  
  @Output() confirmed = new EventEmitter<void>();
  
  showDetails: boolean = false;
  private modalInstance: any;

  ngAfterViewInit() {
    // Inicializa o modal Bootstrap
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  show(data: ModalData) {
    this.modalData = data;
    this.showDetails = false;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  hide() {
    if (this.modalInstance) {
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
