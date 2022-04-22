import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button, { ButtonVariant } from '../../Components/Button';
import EmojiPicker from '../../Components/EmojiPicker';
import Input from '../../Components/Input';
import { auth, db } from '../../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';

function SurveyCreatePage() {
  useDocumentTitle('Create Survey');
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const [user] = useAuthState(auth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
  const [, copy] = useCopyToClipboard();

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const createSurvey = async () => {
    setButtonDisable(true);
    try {
      const newSurvey = await addDoc(collection(db, 'surveys'), {
        title,
        pack,
        creatorId: user?.uid,
        createdDate: new Date(),
      });
      const domain =
        window.location.hostname === 'localhost' ? 'http://' : 'https://';
      const link = `${domain}${window.location.host}/survey/${newSurvey.id}`;
      copy(link);
      toast.success('Survey created and link copied to clipboard');

      navigate(`/survey/answer/${newSurvey.id}`);
    } catch (error) {
      toast.error('Survey creation failed');
    }
    setButtonDisable(false);
  };

  return (
    <div className="container px-4 m-auto mt-10 text-center md:px-8">
      <h1 className="text-4xl font-bold text-center">Create new survey</h1>
      <div className="mt-8 max-w-lg mx-auto">
        <Input
          label="Survey title"
          placeholder="Title..."
          value={title}
          onChange={handleChangeTitle}
        />

        <div className="mt-10">
          <label className="font-semibold text-left block mb-6">
            Click on icon to change
          </label>

          <div className="flex justify-between w-full">
            {pack.map((emote, idx) => (
              <EmojiPicker
                key={idx}
                index={idx}
                defaultEmote={emote}
                onEmotePick={handleEmotePick}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={createSurvey}
          className="mt-8"
          disabled={!title.length || buttonDisable}
          variant={ButtonVariant.PRIMARY}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default SurveyCreatePage;
