import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionBlockWrapper from 'features/surveys/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';
import { QuestionType } from '@prisma/client';

const originalInnerWidth = global.innerWidth;

const setMobileView = () => {
  global.innerWidth = 480;
  global.dispatchEvent(new Event('resize'));
};

const setDesktopView = () => {
  global.innerWidth = 1024; 
  global.dispatchEvent(new Event('resize'));
};

describe('QuestionBlockWrapper', () => {
  const mockProps = {
    index: 0,
    onQuestionRemove: jest.fn(),
    updateQuestion: jest.fn(),
    questionTitle: 'Test Question',
    isSubmitted: false,
    isRemovingPossible: true,
    isDraggingPossible: true,
    updateQuestionRequired: jest.fn(),
    isRequired: false,
    dragHandleProps: null,
    expanded: false,
    expandQuestion: jest.fn(),
  };

  afterEach(() => {
    global.innerWidth = originalInnerWidth;
    global.dispatchEvent(new Event('resize'));
  });

  it('renders EmojiIcon correctly in mobile view', () => {
    setMobileView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const emojiIcon = container.querySelector('svg[data-testid="emoji-icon"]');
    expect(emojiIcon).toBeInTheDocument();
  });

  it('renders EmojiIcon correctly in desktop view', () => {
    setDesktopView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const emojiIcon = container.querySelector('svg[data-testid="emoji-icon"]');
    expect(emojiIcon).toBeInTheDocument();
  });

  it('renders InputIcon correctly in mobile view', () => {
    setMobileView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const inputIcon = container.querySelector('svg[data-testid="input-icon"]');
    expect(inputIcon).toBeInTheDocument();
  });

  it('renders InputIcon correctly in mobile view', () => {
    setDesktopView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const inputIcon = container.querySelector('svg[data-testid="input-icon"]');
    expect(inputIcon).toBeInTheDocument();
  });

  it('displays components in a column on mobile view', () => {
    setMobileView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const wrapperDiv = container.querySelector('.flex.flex-col.sm\\:flex-row');
    expect(wrapperDiv).toHaveClass('flex-col');
    expect(wrapperDiv).not.toHaveClass('flex-row');
  });

  it('displays components in a row on desktop view', () => {
    setDesktopView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const wrapperDiv = container.querySelector('.flex.flex-col.sm\\:flex-row');
  
    if (!wrapperDiv) {
      throw new Error('Element with the specified selector was not found.');
    }
    expect(wrapperDiv.className).toContain('sm:flex-row');
  });  

  it('displays input component in a column on mobile view', () => {
    setMobileView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const wrapperDiv = container.querySelector('.flex.flex-col.sm\\:flex-row');
    expect(wrapperDiv).toHaveClass('flex-col');
    expect(wrapperDiv).not.toHaveClass('flex-row');
  });

  it('displays input component in a row on desktop view', () => {
    setDesktopView();
    const { container } = render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const wrapperDiv = container.querySelector('.flex.flex-col.sm\\:flex-row');
  
    if (!wrapperDiv) {
      throw new Error('Element with the specified selector was not found.');
    }
    expect(wrapperDiv.className).toContain('sm:flex-row');
  });  

});
