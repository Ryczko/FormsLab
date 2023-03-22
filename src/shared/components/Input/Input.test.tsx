import { render, screen } from '@testing-library/react';
import Input from 'shared/components/Input/Input';

describe('Input', () => {
  it('should render with a placeholder', () => {
    render(<Input label="hello" placeholder="hello" />);
    expect(screen.getByPlaceholderText('hello')).toBeInTheDocument();
  });
  it('should render with a required attribute', () => {
    render(<Input label="hello" placeholder="hello" required={true} />);
    expect(screen.getByPlaceholderText('hello')).toHaveAttribute('required');
  });
  it('should render with a className', () => {
    render(
      <Input label="hello" placeholder="hello" className="bg-emerald-200" />
    );
    expect(screen.getByPlaceholderText('hello')).toHaveClass('bg-emerald-200');
  });
  it('should render with a password type', () => {
    render(<Input label="hello" placeholder="hello" type="password" />);
    expect(screen.getByPlaceholderText('hello')).toHaveAttribute(
      'type',
      'password'
    );
  });
  it('should render with a text type', () => {
    render(<Input label="hello" placeholder="hello" type="text" />);
    expect(screen.getByPlaceholderText('hello')).toHaveAttribute(
      'type',
      'text'
    );
  });
  it('should render with a email type', () => {
    render(<Input label="hello" placeholder="hello" type="email" />);
    expect(screen.getByPlaceholderText('hello')).toHaveAttribute(
      'type',
      'email'
    );
  });
});
