import { Injectable } from '@angular/core';
import { Optional, UID, User } from '../../common/types';

@Injectable()
export class AuthService {
  private static currentUser: Optional<UID<Omit<User, 'password'>>> = null;

  private saveToLocalStorage(): void {
    localStorage.setItem(
      'currentUser',
      JSON.stringify(AuthService.currentUser)
    );
  }

  private loadFromLocalStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.setCurrentUser(JSON.parse(user) as UID<Omit<User, 'password'>>);
    }
  }

  public clear(): void {
    localStorage.removeItem('currentUser');
    AuthService.currentUser = null;
    window.location.href = '/';
  }

  public setCurrentUser(user: UID<Omit<User, 'password'>>): void {
    AuthService.currentUser = user;
    this.saveToLocalStorage();
  }

  public getCurrentUser(): Optional<UID<Omit<User, 'password'>>> {
    this.loadFromLocalStorage();
    return AuthService.currentUser;
  }
}
