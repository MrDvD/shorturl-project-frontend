import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { LinkFormComponent } from '../../components/link-form/LinkFormComponent';

@Directive({
  selector: '[appEditLinkForm]',
})
export class EditLinkForm implements OnInit {
  private component: LinkFormComponent = inject(LinkFormComponent);
  private el = inject(ElementRef);

  ngOnInit() {
    if (this.component) {
      this.component.getLinkForm().patchValue({
        // full_link: "directiveWorks!",
      });
      this.component.setAppearance('flat');
      this.el.nativeElement.style.marginTop = '0';
    }
  }
}
