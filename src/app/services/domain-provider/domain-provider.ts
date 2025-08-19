import { Injectable } from '@angular/core';

@Injectable()
export class DomainProvider {
  public getApiDomain(): string {
    return 'http://45.149.234.138:3000';
  }
}
