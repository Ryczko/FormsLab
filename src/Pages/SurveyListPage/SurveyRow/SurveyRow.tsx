import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from '../../../Components/Button';
import IconButton, { IconButtonVariant } from '../../../Components/IconButton';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../../Hooks/useCopyToClipboard';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CsvDownload from 'react-json-to-csv';

type Props = {
  question: string;
  time: string;
  id: string;
};

export default function SurveyRow({ question, time, id }: Props) {
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
    toast.success('Link copied to clipboard');
  };

  const handleOnMoreButton = () => {
    navigate(`/survey/answer/${id}`);
  };

  return (
    <div className="flex max-w-full flex-col w-[600px] my-2 md:flex-row">
      <div className="flex justify-between w-full rounded-b-none items-center bg-white px-4 py-3 rounded-md shadow-sm md:rounded-b-md">
        <div>{question}</div>
        <div>{time}</div>
      </div>
      <div className="flex w-full md:w-auto md:ml-2">
        <Button
          variant={ButtonVariant.OUTLINE}
          className="border-t-0 p-2 rounded-t-none mr-2 w-full md:w-auto md:rounded-t-md md:border-t-[1px]"
          onClick={handleOnMoreButton}
        >
          More
        </Button>
        <CsvDownload
          className="rounded-t-none text-center justify-center md:w-auto md:rounded-t-md pr-2"
          data={[
            {
              id: id,
              question: question,
              createdDate: time,
            },
          ]}
          filename={`${question}_${time}.csv`}
        >
          <IconButton
            variant={IconButtonVariant.PRIMARY}
            className={'h-12'}
            title="Download as CSV"
            icon={<DownloadIcon className="w-5 h-5" />}
          />
        </CsvDownload>
        <IconButton
          variant={IconButtonVariant.PRIMARY}
          className={
            'rounded-t-none  text-center justify-center md:w-auto md:rounded-t-md'
          }
          title="Copy link to clipboard"
          icon={<LinkIcon className="w-5 h-5" />}
          onClick={handleCopyLink}
        />
      </div>
    </div>
  );
}
