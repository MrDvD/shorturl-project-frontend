import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListLinkPageComponent } from './ListLinkPageComponent';

describe('ListLinkPageComponent', () => {
  let component: ListLinkPageComponent;
  let fixture: ComponentFixture<ListLinkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLinkPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
