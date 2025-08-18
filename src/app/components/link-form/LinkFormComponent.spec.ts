import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkFormComponent } from './LinkFormComponent';
import { ServiceToken } from '../../services/tokens';
import { MockedLinkService } from '../../services/mocked-link-service/mocked-link-service';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';

describe('LinkFormComponent', () => {
  let component: LinkFormComponent;
  let fixture: ComponentFixture<LinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkFormComponent],
      providers: [
        {
          provide: ServiceToken.LINK_SERVICE,
          useClass: MockedLinkService,
        },
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
        DomainProvider,
        AuthProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
