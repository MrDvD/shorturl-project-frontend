import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Link, Optional } from '../../common/types';
import { FormValidator } from '../form-validators';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export class LinkForm extends FormGroup {
  constructor(
    defaultValues: Partial<
      Omit<Link, 'expire'> & { expire?: [TuiDay, TuiTime] }
    > = {}
  ) {
    super({
      full_link: new FormControl<Link['full_link'] | null>(
        defaultValues.full_link ?? null
      ),
      type: new FormControl<Link['type'] | null>(defaultValues.type ?? null, {
        nonNullable: true,
      }),
      short_id: new FormControl<Link['short_id'] | null>(
        defaultValues.short_id ?? null
      ),
      has_expire: new FormControl<Link['has_expire'] | null>(
        defaultValues.has_expire ?? null,
        { nonNullable: true }
      ),
      expire: new FormControl<[TuiDay, TuiTime] | null>(
        defaultValues.expire ?? null,
        { nonNullable: true }
      ),
      has_metadata: new FormControl<Link['has_metadata']>(
        defaultValues.has_metadata ?? false,
        { nonNullable: true }
      ),
      name: new FormControl<Link['name'] | null>(defaultValues.name ?? null),
      description: new FormControl<Link['description'] | null>(
        defaultValues.description ?? null
      ),
    });
  }

  public getValidators(): Record<string, ValidatorFn[]> {
    return {
      full_link: [FormValidator.required, FormValidator.isLink],
      type: [FormValidator.required],
      short_id: [FormValidator.required],
      has_expire: [FormValidator.required],
      expire: [FormValidator.required],
      has_metadata: [],
      name: [FormValidator.required, FormValidator.maxLength(50)],
      description: [FormValidator.required, FormValidator.maxLength(200)],
    };
  }

  public getLink(): Optional<Link> {
    if (!this.valid) {
      return null;
    }
    const { expire } = this.getRawValue();
    if (expire) {
      const [day, time] = expire;
      const date = (day as TuiDay).toLocalNativeDate();
      const timeInMs = (time as TuiTime).toAbsoluteMilliseconds();
      const combinedDate = new Date(date.getTime() + timeInMs);

      return this.valid
        ? { ...this.getRawValue(), expire: combinedDate }
        : null;
    }
    return this.getRawValue();
  }

  public getFullLink(): AbstractControl {
    const fullLink = this.get('full_link');
    if (fullLink) {
      return fullLink;
    }
    throw new Error('Full link control is not defined');
  }

  public getType(): AbstractControl {
    const type = this.get('type');
    if (type) {
      return type;
    }
    throw new Error('Type control is not defined');
  }

  public getHasExpire(): AbstractControl {
    const hasExpire = this.get('has_expire');
    if (hasExpire) {
      return hasExpire;
    }
    throw new Error('Has expire control is not defined');
  }

  public getExpire(): AbstractControl {
    const expire = this.get('expire');
    if (expire) {
      return expire;
    }
    throw new Error('Expire control is not defined');
  }

  public getHasMetadata(): AbstractControl {
    const hasMetadata = this.get('has_metadata');
    if (hasMetadata) {
      return hasMetadata;
    }
    throw new Error('Has metadata control is not defined');
  }
}
