import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountPageComponent } from './AccountPageComponent';
import { RouterModule } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';
import { AuthProvider } from '../../services/auth-provider/auth-provider';
import { DomainProvider } from '../../services/domain-provider/domain-provider';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
        AuthProvider,
        DomainProvider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
