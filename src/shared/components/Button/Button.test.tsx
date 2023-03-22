import { render, screen } from '@testing-library/react';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'shared/components/Button/Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should render with a className', () => {
    render(<Button className="test">Hello</Button>);
    expect(screen.getByText('Hello')).toHaveClass('test');
  });

  it('should render with a variant', () => {
    render(<Button variant={ButtonVariant.PRIMARY}>Hello</Button>);
    expect(screen.getByText('Hello')).toHaveClass('btn-primary');
  });

  it('should render with a sizeType', () => {
    render(<Button sizeType={ButtonSize.MEDIUM}>Hello</Button>);
    expect(screen.getByText('Hello')).toHaveClass('w-32');
  });

  it('should render with a disabled', () => {
    render(<Button disabled>Hello</Button>);
    expect(screen.getByText('Hello')).toBeDisabled();
  });

  it('should render with a submit type', () => {
    render(<Button type="submit">Hello</Button>);
    expect(screen.getByText('Hello')).toHaveAttribute('type', 'submit');
  });

  it('should render with a default type', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText('Hello')).toHaveAttribute('type', 'button');
  });
});
