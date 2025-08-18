import { inject, Injectable } from '@angular/core';
import { AuthProvider } from '../auth-provider/auth-provider';

@Injectable()
export class AvailableServicesProvider {
  private readonly authProvider = inject(AuthProvider);

  public getAvailableServices(): { name: string; url: string }[] {
    const availableServices = [{ name: 'Новая ссылка', url: '/generate-url' }];
    const user = this.authProvider.getCurrentUser();
    if (user) {
      availableServices.push({
        name: 'Мои ссылки',
        url: `/${user.item.login}/list-url`,
      });
    }
    return availableServices;
  }
}
