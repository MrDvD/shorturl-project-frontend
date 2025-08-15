import { FormGroup } from '@angular/forms';

export type Optional<T> = T | null;

export type UID<T> = {
  id: number;
  item: T;
};

export type User = {
  login: string;
  password: string;
};

export function isUser(raw: ReturnType<FormGroup['getRawValue']>): raw is User {
  return typeof raw.login === 'string' && typeof raw.password === 'string';
}
