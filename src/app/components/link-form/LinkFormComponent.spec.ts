import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkFormComponent } from './LinkFormComponent';

describe('LinkFormComponent', () => {
  let component: LinkFormComponent;
  let fixture: ComponentFixture<LinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
