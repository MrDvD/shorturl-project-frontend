import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesPageComponent } from './ServicesPageComponent';
import { RouterModule } from '@angular/router';
import { AvailableServicesProvider } from '../../services/available-services-provider/available-services-provider';
import { AuthProvider } from '../../services/auth-provider/auth-provider';

describe('ServicesPageComponent', () => {
  let component: ServicesPageComponent;
  let fixture: ComponentFixture<ServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPageComponent, RouterModule.forRoot([])],
      providers: [AvailableServicesProvider, AuthProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
