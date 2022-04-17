import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';
import EmojiButton from '../../Components/EmojiButton';

function SurveyPage() {
  const { surveyId } = useParams();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('');

  useEffect(() => {
    //fetch data from backend
    setQuestion('How Do You Feel?');
    setIcons(['☹️', '😕', '🙂', '😃']);
  }, [surveyId]);

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    setSelectedIcon(target.textContent);
  };

  const handleSave = () => {
    console.log(selectedIcon, answer);
  };

  const handleInputAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="container px-4 m-auto mt-10 mb-6 text-center md:px-8">
      <h1 className="text-4xl font-bold text-center ">{question}</h1>
      <div className="flex flex-col items-center mt-6 sm:flex-row sm:justify-center">
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
          className="w-11/12 h-56 p-4 rounded-lg shadow resize-none focus:outline-none lg:w-1/2"
          placeholder="Tell Us More"
          value={answer}
          onChange={handleInputAnswer}
        ></textarea>
      </div>
      <Button
        disabled={!selectedIcon}
        onClick={handleSave}
        className="mt-6"
        variant={ButtonVariant.PRIMARY}
        sizeType={ButtonSize.MEDIUM}
      >
        Save
      </Button>
    </div>
  );
}

export default SurveyPage;
