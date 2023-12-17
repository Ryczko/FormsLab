import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const emojiIcon = screen.getByTestId('emoji-icon');
    expect(emojiIcon).toBeInTheDocument();
  });
  

  it('renders EmojiIcon correctly in desktop view', () => {
    setDesktopView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const emojiIcon = screen.getByTestId('emoji-icon');
    expect(emojiIcon).toBeInTheDocument();
  });

  it('renders InputIcon correctly in mobile view', () => {
    setMobileView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const inputIcon = screen.getByTestId('input-icon');
    expect(inputIcon).toBeInTheDocument();
  });

  it('renders InputIcon correctly in desktop view', () => {
    setDesktopView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const inputIcon = screen.getByTestId('input-icon');
    expect(inputIcon).toBeInTheDocument();
  });

  it('displays components in a column on mobile view', () => {
    setMobileView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const wrapperDiv = screen.getByTestId('wrapper-div');
    expect(wrapperDiv).toHaveClass('flex-row');
    expect(wrapperDiv).toHaveClass('w-full');
    expect(wrapperDiv).toHaveClass('justify-between');
  });

  it('displays components in a row on desktop view', () => {
    setDesktopView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.EMOJI} />);
    const wrapperDiv = screen.getByTestId('wrapper-div');
  
    if (!wrapperDiv) {
      throw new Error('Element with the specified selector was not found.');
    }
    expect(wrapperDiv).toHaveClass('flex-row');
    expect(wrapperDiv).toHaveClass('sm:w-fit');
    expect(wrapperDiv).toHaveClass('justify-between');
  });  

  it('displays input component in a column on mobile view', () => {
    setMobileView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const wrapperDiv = screen.getByTestId('wrapper-div');
    expect(wrapperDiv).toHaveClass('flex-row');
    expect(wrapperDiv).toHaveClass('w-full');
    expect(wrapperDiv).toHaveClass('justify-between');
  });

  it('displays input component in a row on desktop view', () => {
    setDesktopView();
    render(<QuestionBlockWrapper {...mockProps} type={QuestionType.INPUT} />);
    const wrapperDiv = screen.getByTestId('wrapper-div');
  
    if (!wrapperDiv) {
      throw new Error('Element with the specified selector was not found.');
    }
    expect(wrapperDiv).toHaveClass('flex-row');
    expect(wrapperDiv).toHaveClass('sm:w-fit');
    expect(wrapperDiv).toHaveClass('justify-between');  });  

});
