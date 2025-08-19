import { Injectable } from '@angular/core';

@Injectable()
export class DomainProvider {
  public getApiDomain(): string {
    return 'https://8d414153df7c.ngrok-free.app';
  }
}
