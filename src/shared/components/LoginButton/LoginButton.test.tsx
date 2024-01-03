import { render, screen, fireEvent } from '@testing-library/react';
import LoginButton from 'shared/components/LoginButton/LoginButton';

describe('LoginButton', () => {
  it('should render only with a image', () => {
    render(<LoginButton image="https://via.placeholder.com/24x24" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <LoginButton image="https://via.placeholder.com/24x24">Hello</LoginButton>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should render with a onClick', () => {
    const onClick = jest.fn();
    render(
      <LoginButton
        image="https://via.placeholder.com/24x24"
        onClick={onClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render with a default type', () => {
    render(
      <LoginButton image="https://via.placeholder.com/24x24">Hello</LoginButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should render with a submit type', () => {
    render(
      <LoginButton image="https://via.placeholder.com/24x24" type="submit">
        Hello
      </LoginButton>
    );
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply custom class when provided', () => {
    render(
      <LoginButton image="https://via.placeholder.com/24x24" className="custom-button">
        Hello
      </LoginButton>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-button');
  });
});
