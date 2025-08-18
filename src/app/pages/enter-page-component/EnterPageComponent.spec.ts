import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterPageComponent } from './EnterPageComponent';
import { RouterModule } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { ApiUserService } from '../../services/api-user-service/api-user-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { AuthProvider } from '../../services/auth-provider/auth-provider';

describe('EnterPageComponent', () => {
  let component: EnterPageComponent;
  let fixture: ComponentFixture<EnterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPageComponent, RouterModule.forRoot([])],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: ApiUserService,
        },
        DomainProvider,
        AuthProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
