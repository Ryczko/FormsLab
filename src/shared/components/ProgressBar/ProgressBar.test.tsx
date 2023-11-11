import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Progressbar from 'shared/components/ProgressBar/ProgressBar';

describe('Progressbar Component', () => {
  test('renders with provided currentStep and totalSteps', async () => {
    const currentStep = 2;
    const totalSteps = 5;

    const { getByText } = render(
      <Progressbar currentStep={currentStep} totalSteps={totalSteps} />
    );

    const stepInfo = getByText(`Step ${currentStep} of ${totalSteps}`);
    const percentageInfo = getByText(`${((currentStep / totalSteps) * 100).toFixed(2)}%`);


    expect(stepInfo).toBeInTheDocument();
    expect(percentageInfo).toBeInTheDocument();
  });
});
