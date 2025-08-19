import { Injectable } from '@angular/core';

@Injectable()
export class DomainProvider {
  public getApiDomain(): string {
    return 'https://fawn-logical-adequately.ngrok-free.app';
  }
}
