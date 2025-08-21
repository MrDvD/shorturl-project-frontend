import { TuiAlertService } from '@taiga-ui/core';
import { ErrorResponse } from '../common/types';
import { Observable } from 'rxjs';

export function showError(
  error: ErrorResponse,
  alert: TuiAlertService
): Observable<void> {
  return alert.open(error.message, {
    label: 'Ошибка',
    autoClose: 3000,
    appearance: 'negative',
  });
}
