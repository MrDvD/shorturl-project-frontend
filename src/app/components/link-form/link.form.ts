import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Link, Optional } from '../../common/types';

export class LinkForm extends FormGroup {
  constructor() {
    super({
      full_link: new FormControl<Link['full_link'] | null>(null, [
        Validators.required,
        Validators.pattern('https?://.+'),
      ]),
      type: new FormControl<Link['type'] | null>(null, [Validators.required]),
      short_id: new FormControl<Link['short_id'] | null>(null, [
        Validators.required,
      ]),
      has_expire: new FormControl<Link['has_expire'] | null>(null, [
        Validators.required,
      ]),
      expire: new FormControl<Link['expire'] | null>(null, [
        Validators.required,
      ]),
      has_metadata: new FormControl<Link['has_metadata'] | null>(false),
      name: new FormControl<Link['name'] | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      description: new FormControl<Link['description'] | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  public getLink(): Optional<Link> {
    return this.valid ? this.getRawValue() : null;
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

  public getHasMetadata(): AbstractControl {
    const hasMetadata = this.get('has_metadata');
    if (hasMetadata) {
      return hasMetadata;
    }
    throw new Error('Has metadata control is not defined');
  }
}
