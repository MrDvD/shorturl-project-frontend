import { Injectable } from '@angular/core';

@Injectable()
export class DomainService {
  public getApiDomain(): string {
    return 'https://my.cloudpub.ru';
  }
}
