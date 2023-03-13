import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { db } from '../../../firebase';
import Head from 'next/head';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'src/components/Button/Button';
import EmojiButton from 'src/components/EmojiButton/EmojiButton';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';

function SurveyPage() {
  const router = useRouter();

  const { surveyId } = router.query as { surveyId: string };

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (surveyId) {
      getSurveyData();
    }
  }, [surveyId]);

  const getSurveyData = async () => {
    const surveyData = await getDoc(doc(db, 'surveys', surveyId!));
    if (!surveyData.exists()) {
      router.replace('/');
      return;
    }

    if (
      surveyData.data()?.startDate.toDate().toISOString() >
      new Date().toISOString()
    ) {
      toast.error('Survey is not opened yet');
      router.replace('/');
      return;
    }

    if (
      surveyData.data()?.endDate.toDate().toISOString() <
      new Date().toISOString()
    ) {
      toast.error('Survey is closed');
      router.replace('/');
      return;
    }

    setQuestion(surveyData.data()?.title);
    setIcons(surveyData.data()?.pack);
    setIsLoading(false);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    setSelectedIcon(target.textContent);
  };

  const handleSave = async () => {
    setButtonDisable(true);
    setIsLoading(true);

    try {
      if (!surveyId) {
        toast.error('Survey ID not found');
        throw new Error('Survey ID not found');
      }
      await addDoc(collection(db, 'surveys', surveyId, 'answers'), {
        selectedIcon,
        answer,
        answerDate: new Date(),
      });
      toast.success('The reply has been sent');
      router.replace('/');
    } catch (error) {
      toast.error('Error occured');
    } finally {
      setButtonDisable(false);
      setIsLoading(false);
    }
  };

  const handleInputAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container px-4 m-auto mb-6 text-center md:px-8">
          <Header>{question}</Header>

          <div className="grid  grid-cols-2  gap-2 mx-auto max-w-[500px] sm:grid-cols-4">
            {icons.map((icon, idx) => (
              <EmojiButton
                icon={icon}
                selected={selectedIcon === icon}
                key={idx}
                onClick={handleIconClick}
              />
            ))}
          </div>
          <div className="mt-8">
            <textarea
              className="p-4 w-[500px] max-w-[100%] h-56 rounded-lg focus:outline-none shadow resize-none"
              placeholder="Tell Us More"
              value={answer}
              onChange={handleInputAnswer}
            ></textarea>
          </div>
          <Button
            disabled={!selectedIcon || buttonDisable}
            onClick={handleSave}
            className="mt-6 w-full sm:w-auto"
            variant={ButtonVariant.PRIMARY}
            sizeType={ButtonSize.MEDIUM}
          >
            Send
          </Button>
        </div>
      )}
    </>
  );
}

export default SurveyPage;
