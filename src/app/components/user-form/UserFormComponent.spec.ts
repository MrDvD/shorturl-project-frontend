import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './UserFormComponent';
import { ServiceToken } from '../../services/tokens';
import { RouterModule } from '@angular/router';
import { ApiUserService } from '../../services/api-user-service/api-user-service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { AuthProvider } from '../../services/auth-provider/auth-provider';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, RouterModule.forRoot([])],
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

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
