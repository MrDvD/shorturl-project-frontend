import { inject, Pipe, PipeTransform } from '@angular/core';
import { Link } from '../../common/types';
import { DomainProvider } from '../../services/domain-provider/domain-provider';

@Pipe({
  name: 'formatLink',
})
export class FormatLinkPipe implements PipeTransform {
  private domain: string = inject(DomainProvider).getDomain();

  transform(link: Link): string {
    switch (link.type) {
      case 'short':
        return this.domain + '/v1/' + link.short_id;
      case 'named':
        return this.domain + `/${link.owner}/` + link.short_id;
      default:
        throw new Error(`Unknown link type: ${link.type}`);
    }
  }
}
