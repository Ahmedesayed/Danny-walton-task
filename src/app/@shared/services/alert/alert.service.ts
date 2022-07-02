import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  showCustomDialog(args: {
    header: string;
    width?: string;
    data?: any;
    cmp: any;
  }) {
    const ref = this.dialogService.open(args.cmp, {
      data: args.data,
      header: args.header,
      width: args.width || '70%',
    });
    return ref;
  }

  showToast(args: {
    severity?: 'info' | 'success' | 'warn' | 'error';
    summary?: string;
    detail?: string;
    sticky?: boolean;
    data?: any;
    life?: number;
    position?:
      | 'center'
      | 'top-left'
      | 'top-right'
      | 'top-center'
      | 'bottom-left'
      | 'bottom-right'
      | 'bottom-center';
  }) {
    this.messageService.add({
      severity: args.severity || 'success',
      summary: args.summary,
      detail: args.detail,
      life: args.life || 5000,
      key: 'toast-' + (args.position || 'top-right'),
    });
  }

  showMsg(args: {
    severity?: 'info' | 'success' | 'warn' | 'error';
    summary?: string;
    detail?: string;
    life?: number;
  }) {
    this.messageService.add({
      severity: args.severity || 'success',
      summary: args.summary || 'dsds',
      detail: args.detail || 'dsds',
      closable: true,
      life: args.life || 3000,
    });
  }

  showMultiMsg(
    args: {
      severity: 'info' | 'success' | 'warn' | 'error';
      summary: string;
      detail: string;
    }[]
  ) {
    this.messageService.addAll(args);
  }

  clearMsg(key?: string) {
    this.messageService.clear(key);
  }

  confirmPopup(args: {
    acceptCallback: Function;
    rejectCallback?: Function;
    message?: string;
    icon?: string;
    header?: string;
    event: Event;
  }) {
    this.confirmationService.confirm({
      key: 'popup',
      header: args.header,
      target: args.event ? args.event.target : (null as any),
      message: args.message ?? 'Are you sure that you want to proceed?',
      icon: args.icon ?? 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        args.acceptCallback();
      },
      reject: () => {
        if (args.rejectCallback) args.rejectCallback();
      },
    });
  }

  confirmDialog(args: {
    acceptCallback?: Function;
    rejectCallback?: Function;
    message?: string;
    icon?: string;
    header?: string;
    event?: Event;
  }) {
    this.confirmationService.confirm({
      key: 'dialog',
      header: args.header,
      target: args.event ? args.event.target : (null as any),
      message: args.message ?? 'Are you sure you want to delete?',
      icon: args.icon ?? 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        if (args.acceptCallback) args.acceptCallback();
      },
      reject: () => {
        if (args.rejectCallback) args.rejectCallback();
      },
    });
  }
}
