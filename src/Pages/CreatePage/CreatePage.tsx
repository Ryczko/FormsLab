import { useState } from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';
import EmojiPicker from '../../Components/EmojiPicker/EmojiPicker';
import Input from '../../Components/Input/Input';

function CreatePage() {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const createSurvey = () => {
    console.log(title, pack);
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
          disabled={!title.length}
          variant={ButtonVariant.PRIMARY}
          sizeType={ButtonSize.NORMAL}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default CreatePage;
