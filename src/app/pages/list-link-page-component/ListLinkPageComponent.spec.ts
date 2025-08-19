import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListLinkPageComponent } from './ListLinkPageComponent';
import { RouterModule } from '@angular/router';
import { MockedLinkService } from '../../services/mocked-link-service/mocked-link-service';
import { ServiceToken } from '../../services/tokens';
import { DomainProvider } from '../../services/domain-provider/domain-provider';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { ApiUserService } from '../../services/api-user-service/api-user-service';

describe('ListLinkPageComponent', () => {
  let component: ListLinkPageComponent;
  let fixture: ComponentFixture<ListLinkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLinkPageComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ServiceToken.LINK_SERVICE,
          useClass: MockedLinkService,
        },
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: ApiUserService,
        },
        AuthProvider,
        DomainProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
