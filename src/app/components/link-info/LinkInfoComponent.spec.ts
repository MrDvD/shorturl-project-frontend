import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkInfoComponent } from './LinkInfoComponent';
import { MockedLinkService } from '../../services/mocked-link-service/mocked-link-service';
import { ServiceToken } from '../../services/tokens';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';
import { DomainProvider } from '../../services/domain-provider/domain-provider';

describe('LinkInfoComponent', () => {
  let component: LinkInfoComponent;
  let fixture: ComponentFixture<LinkInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkInfoComponent],
      providers: [
        {
          provide: ServiceToken.LINK_SERVICE,
          useClass: MockedLinkService,
        },
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
        AuthProvider,
        DomainProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkInfoComponent);
    component = fixture.componentInstance;
    component.link = {
      id: 5,
      item: {
        full_link: 'asdsad',
        type: 'short',
        has_expire: false,
        has_metadata: false,
        create_date: new Date(),
        owner: '',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
