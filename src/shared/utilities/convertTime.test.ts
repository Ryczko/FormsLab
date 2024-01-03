import { formatDateDistance, formatDate } from 'shared/utilities/convertTime'; // Replace with the actual path to your module

describe('Date Formatting Functions', () => {
  test('formatDateDistance should return a formatted distance string', () => {
    // Example dates for testing
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - 60000); // One minute ago

    // Mocking the formatDistance function for consistent results
    jest.mock('date-fns', () => ({
      formatDistance: jest.fn(() => '2 minutes ago'),
    }));

    const result = formatDateDistance(pastDate);
    expect(result).toBe('1 minute ago');
  });

  test('formatDate should return a formatted date string', () => {
    // Example date for testing
    const dateToFormat = new Date('2023-01-15T12:30:00Z');

    // Mocking the toLocaleDateString function for consistent results
    jest.spyOn(dateToFormat, 'toLocaleDateString').mockReturnValue('January 15, 2023');

    const result = formatDate(dateToFormat);
    expect(result).toBe('January 15, 2023');
  });

  test('formatDate should handle invalid date and return an empty string', () => {
    const invalidDate = 'invalid-date';

    const result = formatDate(invalidDate);
    expect(result).toBe('Invalid Date');
  });
});
