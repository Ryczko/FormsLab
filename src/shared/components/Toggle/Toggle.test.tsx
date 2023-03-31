import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from 'shared/components/Toggle/Toggle';

describe('Toggle', () => {
  const onToggleMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render toggle switch', () => {
    render(<Toggle isEnabled={true} onToggle={onToggleMock} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should call onToggle function when switch is toggled', () => {
    render(<Toggle isEnabled={true} onToggle={onToggleMock} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  it('should have correct label text', () => {
    const label = 'Toggle label';
    render(<Toggle isEnabled={true} onToggle={onToggleMock} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should apply classNames prop to the parent element', () => {
    const classNames = 'bg-red-500';
    render(
      <Toggle
        isEnabled={true}
        onToggle={onToggleMock}
        classNames={classNames}
      />
    );
    expect(screen.getByTestId('toggle-wrapper')).toHaveClass(classNames);
  });
});
