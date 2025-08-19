import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateLinkPageComponent } from './GenerateLinkPageComponent';
import { RouterModule } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { MockedLinkService } from '../../services/mocked-link-service/mocked-link-service';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { ApiUserService } from '../../services/api-user-service/api-user-service';

describe('GenerateLinkPageComponent', () => {
  let component: GenerateLinkPageComponent;
  let fixture: ComponentFixture<GenerateLinkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateLinkPageComponent, RouterModule.forRoot([])],
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
          useClass: ApiUserService,
        },
        {
          provide: DomainProvider,
          useClass: DomainProvider,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
