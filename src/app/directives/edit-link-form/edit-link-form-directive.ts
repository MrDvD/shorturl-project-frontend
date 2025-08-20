import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { LinkFormComponent } from '../../components/link-form/link-form-component';
import { Link, UID } from '../../common/types';
import { ServiceToken } from '../../services/tokens';

@Directive({
  selector: '[appEditLinkForm]',
})
export class EditLinkForm implements OnInit {
  private component: LinkFormComponent = inject(LinkFormComponent);
  private el = inject(ElementRef);
  private readonly linkService = inject(ServiceToken.LINK_SERVICE);
  @Input({ required: true }) linkId: UID<Link>['id'] = 0;

  ngOnInit() {
    if (this.component) {
      const link$ = this.linkService.read(this.linkId);
      link$.subscribe((link) => {
        this.component.getLinkForm().patchValue({
          full_link: link.item.full_link,
          type: link.item.type,
          has_expire: link.item.has_expire,
          has_metadata: link.item.has_metadata,
          name: link.item.name || '',
          description: link.item.description || '',
        });
        if (link.item.type === 'named' && link.item.short_id) {
          this.component.getLinkForm().patchValue({
            short_id: link.item.short_id,
          });
        }
      });
      this.component.link_id = this.linkId;
      this.component.sendMethod = 'PUT';
      this.component.setAppearance('flat');
      this.el.nativeElement.style.marginTop = '0';
    }
  }
}
