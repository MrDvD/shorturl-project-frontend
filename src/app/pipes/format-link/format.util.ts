import { Link } from '../../common/types';

export function formatLink(link: Link): string {
  switch (link.type) {
    case 'short':
      return `/v1/${link.short_id}`;
    case 'named':
      return `/${link.owner}/${link.short_id}`;
    default:
      throw new Error(`Unknown link type: ${link.type}`);
  }
}
