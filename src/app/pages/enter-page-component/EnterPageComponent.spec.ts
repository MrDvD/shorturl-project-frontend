import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterPageComponent } from './EnterPageComponent';
import { RouterModule } from '@angular/router';

describe('EnterPageComponent', () => {
  let component: EnterPageComponent;
  let fixture: ComponentFixture<EnterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPageComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
