import React, { useState } from 'react';
import { useSurveyResultsContext } from 'features/surveys/features/SurveyResults/managers/context';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Input, { InputSize } from 'shared/components/Input/Input';
import { QuestionType } from '@prisma/client';
import EmojiListItem from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/EmojiListItem/EmojiListItem';
import StarComponent from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/RateComponent/StarComponent/StarComponent';
import clsx from 'clsx';

export default function IndividualResults() {
  const { mappedAnswersData, surveyData } = useSurveyResultsContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalAnswers = surveyData?.answers.length || 0;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalAnswers - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) - 1;
    if (newValue >= 0 && newValue < totalAnswers) {
      setCurrentIndex(newValue);
    }
  };

  if (totalAnswers <= 0) {
    return <></>;
  }

  return (
    <div className="mt-6">
      <div className="mx-auto mb-6 flex flex-row items-center justify-center gap-x-1">
        <Button
          title={'Previous'}
          onClick={handlePrevious}
          className="px-2"
          variant={ButtonVariant.FLAT}
          icon={<ChevronLeftIcon className="h-5 w-5" />}
          disabled={currentIndex === 0}
        />

        <div className="flex flex-row items-center gap-x-2">
          <Input
            className="my-0 max-w-[100px] text-center"
            name="survey-title"
            placeholder={'1'}
            value={currentIndex + 1}
            type="number"
            error={''}
            max={totalAnswers}
            min={1}
            step={1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
            inputSize={InputSize.SMALL}
          />

          <p>of</p>
          <p>{surveyData?.answers.length || 0}</p>
        </div>

        <Button
          title={'Next'}
          onClick={handleNext}
          className="px-2"
          variant={ButtonVariant.FLAT}
          icon={<ChevronRightIcon className="h-5 w-5" />}
          disabled={currentIndex === totalAnswers - 1}
        />
      </div>

      {Object.keys(mappedAnswersData).map((key, index) => {
        const question = mappedAnswersData[key].question;
        const questionType = mappedAnswersData[key].questionType;
        const answer = mappedAnswersData[key].answers[currentIndex].answer;
        const options = mappedAnswersData[key].options;

        return (
          <div
            className="mb-2 rounded-md border bg-white p-4 text-center shadow-sm"
            key={index}
          >
            <h2 className="mb-4 text-lg font-semibold">{question}</h2>
            {answer ? (
              <>
                {questionType === QuestionType.INPUT && (
                  <p className="mb-3 mt-4">{answer}</p>
                )}

                {questionType === QuestionType.RATE && (
                  <div className="mb-3 flex flex-wrap justify-center gap-x-1">
                    {[...Array(5)].map((_, index) => (
                      <StarComponent
                        key={index}
                        classNames={clsx(
                          answer && index < +answer
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                )}

                {questionType === QuestionType.EMOJI && (
                  <div className="mb-3 flex flex-wrap justify-center gap-x-1">
                    {options.map((icon) => (
                      <EmojiListItem
                        icon={icon}
                        selected={answer === icon}
                        isAnySelected={!!answer}
                        key={icon}
                      />
                    ))}
                  </div>
                )}

                {questionType === QuestionType.CHOICE &&
                  options.map((option, idx) => (
                    <button
                      key={idx}
                      className={clsx(
                        'mb-2 w-full rounded border p-4 text-center text-sm font-medium',
                        answer === option && 'bg-gray-200'
                      )}
                      disabled={true}
                    >
                      {option.trim() || '-'}
                    </button>
                  ))}
              </>
            ) : (
              <div className="mb-3 mt-4 italic">No answer</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
