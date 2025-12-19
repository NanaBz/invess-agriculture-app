import { getErrorMessage } from '../utils/errorUtils';

describe('getErrorMessage', () => {
  it('returns the string if error is a string', () => {
    expect(getErrorMessage('fail')).toBe('fail');
  });
  it('returns the message if error is an Error', () => {
    expect(getErrorMessage(new Error('fail'))).toBe('fail');
  });
  it('returns the message if error is an object with message', () => {
    expect(getErrorMessage({ message: 'fail' })).toBe('fail');
  });
  it('returns fallback for unknown error', () => {
    expect(getErrorMessage(123)).toBe('An unexpected error occurred. Please try again.');
  });
});
