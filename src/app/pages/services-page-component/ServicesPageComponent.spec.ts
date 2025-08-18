import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesPageComponent } from './ServicesPageComponent';
import { RouterModule } from '@angular/router';

describe('ServicesPageComponent', () => {
  let component: ServicesPageComponent;
  let fixture: ComponentFixture<ServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPageComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
