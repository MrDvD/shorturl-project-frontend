import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable()
export class DomainProvider {
  private document: Document = inject(DOCUMENT);

  public getDomain(): string {
    return (
      this.document.location.protocol + '//' + this.document.location.hostname
    );
  }
}
