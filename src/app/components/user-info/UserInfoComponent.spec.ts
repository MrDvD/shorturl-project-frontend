import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoComponent } from './UserInfoComponent';
import { ServiceToken } from '../../services/tokens';
import { MockedLinkService } from '../../services/mocked-link-service/mocked-link-service';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';
import { DomainProvider } from '../../services/domain-provider/domain-provider';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent],
      providers: [
        {
          provide: ServiceToken.LINK_SERVICE,
          useClass: MockedLinkService,
        },
        {
          provide: AuthProvider,
          useClass: AuthProvider,
        },
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
        {
          provide: DomainProvider,
          useClass: DomainProvider,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
