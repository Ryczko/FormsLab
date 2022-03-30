import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';
import EmojiButton from '../../Components/EmojiButton';

function FormPage() {
  const { formId } = useParams();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('');

  useEffect(() => {
    //fetch data from backend
    setQuestion('How Do You Feel?');
    setIcons(['☹️', '😕', '🙂', '😃']);
  }, [formId]);

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
    <div className="container mt-10 m-auto px-4 md:px-8 text-center">
      <h1 className="text-center font-bold text-4xl ">{question}</h1>
      <div className="mt-6">
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
          className="w-11/12 h-56 resize-none rounded-lg shadow p-4 focus:outline-none lg:w-1/2"
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

export default FormPage;
