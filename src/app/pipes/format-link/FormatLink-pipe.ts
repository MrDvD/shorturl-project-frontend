import { inject, Pipe, PipeTransform } from '@angular/core';
import { Link } from '../../common/types';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { formatLink } from './format.util';

@Pipe({
  name: 'formatLink',
})
export class FormatLinkPipe implements PipeTransform {
  private domain: string = inject(DomainProvider).getDomain();

  transform(link: Link, includeDomain = true): string {
    if (includeDomain) {
      return this.domain + formatLink(link);
    } else {
      return formatLink(link);
    }
  }
}
