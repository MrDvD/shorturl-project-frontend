import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterPageComponent } from './EnterPageComponent';
import { RouterModule } from '@angular/router';
import { ServiceToken } from '../../services/tokens';
import { MockedUserService } from '../../services/mocked-user-service/mocked-user-service';

describe('EnterPageComponent', () => {
  let component: EnterPageComponent;
  let fixture: ComponentFixture<EnterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPageComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ServiceToken.USER_SERVICE,
          useClass: MockedUserService,
        },
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
