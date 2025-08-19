import { Injectable } from '@angular/core';

@Injectable()
export class DomainProvider {
  public getApiDomain(): string {
    return 'https://my.cloudpub.ru';
  }
}
