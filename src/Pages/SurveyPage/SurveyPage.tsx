import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';
import EmojiButton from '../../Components/EmojiButton';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import { db } from '../../firebase';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';

function SurveyPage() {
  useDocumentTitle('Survey');

  const { surveyId } = useParams();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!surveyId) {
      navigate('/');
      return;
    }

    getSurveyData();
  }, [surveyId]);

  const getSurveyData = async () => {
    const surveyData = await getDoc(doc(db, 'surveys', surveyId!));
    if (!surveyData.exists()) {
      navigate('/');
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
      navigate('/');
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
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container px-4 m-auto mb-6 text-center md:px-8">
          <Header>{question}</Header>

          <div className="grid grid-cols-2 max-w-[500px] mx-auto sm:grid-cols-4">
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
              className="max-w-[100%] w-[500px] h-56 p-4 rounded-lg shadow resize-none focus:outline-none"
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
            Save
          </Button>
        </div>
      )}
    </>
  );
}

export default SurveyPage;
