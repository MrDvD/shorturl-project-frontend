import { inject, Pipe, PipeTransform } from '@angular/core';
import { Link } from '../../common/types';
import { DomainService } from '../../services/domain-service/domain-service';
import { formatLink } from './format.util';

@Pipe({
  name: 'formatLink',
})
export class FormatLinkPipe implements PipeTransform {
  private domain = inject(DomainService).getApiDomain();

  transform(link: Link, includeDomain = true): string {
    if (includeDomain) {
      return this.domain + formatLink(link);
    } else {
      return formatLink(link);
    }
  }
}
