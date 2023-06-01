import { QuestionType } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react';
import BarChart, {
  BarChartData,
} from 'features/surveys/components/ResultsComponents/BarChart/BarChart';
import TextResults from 'features/surveys/components/ResultsComponents/TextResults/TextResults';
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

  const getDataToChart = useCallback((): BarChartData[] => {
    const answersValues = answers.map((answer) => answer.answer);

    const uniqueAnswers = Array.from(new Set(answersValues));

    const result: {
      [key: string]: number;
    } = {};

    uniqueAnswers.forEach((answer) => {
      result[answer] = 0;
    });

    answersValues.forEach((answer) => {
      result[answer] += 1;
    });

    return Object.keys(result)
      .map((key) => ({
        name: key,
        value: result[key],
      }))
      .sort((a, b) => b.value - a.value);
  }, [answers]);

  useEffect(() => {
    if (type === QuestionType.EMOJI) {
      const chartData = getDataToChart();
      setChartData(chartData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  return (
    <div className="mb-2 rounded-md border bg-white/50 p-4 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">{question}</h2>
      {type === QuestionType.EMOJI && <BarChart data={chartData} />}
      {type === QuestionType.INPUT && <TextResults answers={answers} />}
    </div>
  );
}
