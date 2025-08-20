import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../../common/types';

@Pipe({
  name: 'hasMetadata',
})
export class HasMetadataPipe implements PipeTransform {
  transform(link: Link): link is Link & { name: string; description: string } {
    return (
      link.has_metadata &&
      link.name !== undefined &&
      link.description !== undefined
    );
  }
}
