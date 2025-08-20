import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class AvailableServicesProvider {
  private readonly authProvider = inject(AuthService);

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
