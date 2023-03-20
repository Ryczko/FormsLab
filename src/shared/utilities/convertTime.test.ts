import { Timestamp } from 'firestore-jest-mock/mocks/timestamp';
import type { Timestamp as TimestampType } from 'firebase/firestore';
import {
  formatFirebaseDateWithHours,
  formatFirebaseDateWithoutHours,
} from './convertTime';

describe('convertTime', () => {
  it('should return correct date with hours', () => {
    const timestamp: Timestamp = new Timestamp(1651768396, 0);
    let expected: string;

    // fix for different timezones on CI
    if (process.env.CI) {
      expected = '5.05.2022, 16:33';
    } else {
      expected = '5.05.2022, 18:33';
    }
    const result = formatFirebaseDateWithHours(timestamp as TimestampType);
    expect(result).toEqual(expected);
  });

  it('should return correct date without hours', () => {
    const timestamp: Timestamp = new Timestamp(1651768396, 0);
    const expected = '5.05.2022';
    const result = formatFirebaseDateWithoutHours(timestamp as TimestampType);
    expect(result).toEqual(expected);
  });
});
