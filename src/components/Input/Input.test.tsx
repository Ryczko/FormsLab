import { render, screen } from '@testing-library/react';
import Input from '.';

describe('Input', () => {
  it('should render only with a label', () => {
    render(<Input label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
