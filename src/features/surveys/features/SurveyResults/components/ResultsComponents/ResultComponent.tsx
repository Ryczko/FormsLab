import { QuestionType } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react';
import BarChart, {
  BarChartData,
} from 'features/surveys/features/SurveyResults/components/ResultsComponents/BarChart/BarChart';
import TextResults from 'features/surveys/features/SurveyResults/components/ResultsComponents/TextResults/TextResults';
import { MappedAnswerData } from 'types/MappedAnswerData';

type ResultComponentProps = {
  type: QuestionType;
  question: string;
  answers: MappedAnswerData[];
};

export default function ResultComponent({
  type,
  question,
  answers,
}: ResultComponentProps) {
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [notEmptyAnswers, setNotEmptyAnswers] = useState<MappedAnswerData[]>(
    []
  );

  useEffect(() => {
    const notEmptyAnswers = answers.filter(
      (answer) =>
        answer.answer !== null &&
        answer.answer !== undefined &&
        answer.answer !== ''
    );
    setNotEmptyAnswers(notEmptyAnswers);
  }, [answers]);

  const getDataToChart = useCallback((): BarChartData[] => {
    const answersValues = notEmptyAnswers.map((answer) => answer.answer);

    const uniqueAnswers = Array.from(new Set(answersValues));

    const result: {
      [key: string]: number;
    } = {};

    uniqueAnswers.forEach((answer) => {
      if (!answer) return;
      result[answer] = 0;
    });

    answersValues.forEach((answer) => {
      if (!answer) return;
      result[answer] += 1;
    });

    return Object.keys(result)
      .map((key) => ({
        name: key,
        value: result[key],
      }))
      .sort((a, b) => b.value - a.value);
  }, [notEmptyAnswers]);

  useEffect(() => {
    if (
      type === QuestionType.EMOJI ||
      type === QuestionType.CHOICE ||
      type === QuestionType.RATE
    ) {
      const chartData = getDataToChart();
      setChartData(chartData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notEmptyAnswers]);

  return (
    <div className="mb-2 rounded-md border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{question}</h2>
      {type === QuestionType.EMOJI && <BarChart data={chartData} emojiLabels />}
      {type === QuestionType.INPUT && <TextResults answers={notEmptyAnswers} />}
      {type === QuestionType.CHOICE && <BarChart data={chartData} />}
      {type === QuestionType.RATE && <BarChart data={chartData} />}
    </div>
  );
}
