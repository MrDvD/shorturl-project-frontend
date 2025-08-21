import { FormatDatePipe } from './format-date-pipe';

describe('FormatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format ISO date string correctly', () => {
    const pipe = new FormatDatePipe();
    const date = new Date('2023-01-01T00:00:00Z');
    const result = pipe.transform(date.toISOString());
    expect(result).toBe(date.toUTCString());
  });

  it('should format date string without time correctly', () => {
    const pipe = new FormatDatePipe();
    const date = '2023-01-01';
    const result = pipe.transform(date);
    expect(result).toBe(new Date(date).toUTCString());
  });

  it('should format date string with time correctly', () => {
    const pipe = new FormatDatePipe();
    const date = '2023-01-01 12:30:45';
    const result = pipe.transform(date);
    expect(result).toBe(new Date(date).toUTCString());
  });

  it('should format date string with timezone offset correctly', () => {
    const pipe = new FormatDatePipe();
    const date = '2023-01-01T12:30:45+02:00';
    const result = pipe.transform(date);
    expect(result).toBe(new Date(date).toUTCString());
  });

  it('should handle invalid date string gracefully', () => {
    const pipe = new FormatDatePipe();
    const date = 'invalid-date';
    const result = pipe.transform(date);
    expect(result).toBe('Invalid Date');
  });

  it('should format date string with milliseconds correctly', () => {
    const pipe = new FormatDatePipe();
    const date = '2023-01-01T12:30:45.123Z';
    const result = pipe.transform(date);
    expect(result).toBe(new Date(date).toUTCString());
  });

  it('should format short date string correctly', () => {
    const pipe = new FormatDatePipe();
    const date = '1/1/2023';
    const result = pipe.transform(date);
    expect(result).toBe(new Date(date).toUTCString());
  });
});
