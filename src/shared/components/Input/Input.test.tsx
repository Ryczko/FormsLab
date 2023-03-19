import { render, screen } from '@testing-library/react';
import Input from './Input';

describe.skip('Input', () => {
  it('should render only with a label', () => {
    render(<Input placeholder="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
