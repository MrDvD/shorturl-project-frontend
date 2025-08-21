import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class AvailablePagesService {
  private readonly authProvider = inject(AuthService);

  public getAvailablePages(): { name: string; url: string }[] {
    const availablePages = [{ name: 'Новая ссылка', url: '/generate-url' }];
    const user = this.authProvider.getCurrentUser();
    if (user) {
      availablePages.push({
        name: 'Мои ссылки',
        url: `/${user.item.login}/list-url`,
      });
    }
    return availablePages;
  }
}
