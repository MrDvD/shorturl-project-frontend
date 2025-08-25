import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../../common/types';

@Pipe({
  name: 'wasUpdated',
})
export class WasUpdatedPipe implements PipeTransform {
  transform(link: Link): link is Link & { update_date: Date } {
    return link.update_date !== undefined;
  }
}
