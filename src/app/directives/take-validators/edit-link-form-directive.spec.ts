import { TestBed } from '@angular/core/testing';
import { TakeValidators } from './edit-link-form-directive';
import { NgControl } from '@angular/forms';

describe('TakeValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TakeValidators, NgControl],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(TakeValidators);
    expect(directive).toBeTruthy();
  });
});
