import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateLinkPageComponent } from './GenerateLinkPageComponent';

describe('GenerateLinkPageComponent', () => {
  let component: GenerateLinkPageComponent;
  let fixture: ComponentFixture<GenerateLinkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateLinkPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
