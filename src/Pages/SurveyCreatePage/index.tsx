import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button, { ButtonVariant } from '../../Components/Button';
import EmojiPicker from '../../Components/EmojiPicker';
import Input from '../../Components/Input';
import { auth, db } from '../../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SurveyCreatePage() {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const [user] = useAuthState(auth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();

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
      const userDoc = await getDocs(
        query(collection(db, 'users'), where('uid', '==', user?.uid))
      );
      const userId = userDoc.docs[0].id;
      const surveyId = await addDoc(
        collection(db, 'users', userId, 'surveys'),
        {
          title,
          pack,
          createdDate: new Date(),
        }
      );
      toast.success('Survey created');
      navigate(`/survey/answer/${surveyId.id}`);
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
