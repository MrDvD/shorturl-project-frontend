import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToServicesComponent } from './ToServicesComponent';

describe('ToServicesComponent', () => {
  let component: ToServicesComponent;
  let fixture: ComponentFixture<ToServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
