import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './UserFormComponent';
import { ServiceToken } from '../../services/tokens';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';
import { RouterModule } from '@angular/router';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
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
