import Button, { ButtonVariant } from '../../Components/Button';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';

function SurveyListPage() {
  useDocumentTitle('Surveys');

  const [surveysCollection, loading, error] = useCollection(
    collection(db, 'surveys')
  );
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();

  const handleCopyLink = (id: string) => () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
    toast.success('Link copied to clipboard');
  };

  const handleOnMoreButton = (id: string) => () => {
    navigate(`/survey/${id}`);
  };

  return (
    <div className="container mt-10 m-auto px-4 md:px-8 text-center">
      <h1 className="text-center font-bold text-4xl ">Surveys</h1>
      <div className="flex flex-col items-center justify-center py-4">
        <p>
          {
            // TODO: add user friendly error message
            error && <strong>Error: {JSON.stringify(error)}</strong>
          }
          {
            // TODO: add fancy loading
            loading && <span>Loading...</span>
          }
        </p>
        {surveysCollection && surveysCollection.docs?.length > 0 && (
          <table className="text-sm sm:text-base table-auto">
            <thead>
              <tr>
                <th className="sm:p-2">No.</th>
                <th className="sm:p-2">Time</th>
                <th className="sm:p-2">Question</th>
                <th className="sm:p-2" />
                <th className="sm:p-2" />
                <th className="sm:p-2" />
              </tr>
            </thead>
            <tbody>
              {surveysCollection.docs.map((doc, index) => {
                const survey = doc.data();
                return (
                  <tr key={doc.id}>
                    <td className="sm:p-2">{(index += 1)}.</td>
                    <td className="sm:p-2">
                      {survey.createdDate.toDate().toDateString()}
                    </td>
                    <td className="sm:p-2">{survey.title}</td>
                    <td className="sm:p-2">
                      <Button
                        onClick={handleOnMoreButton(doc.id)}
                        variant={ButtonVariant.FLAT}
                        className="p-2"
                      >
                        More
                      </Button>
                    </td>
                    <td className="sm:p-2">
                      <IconButton
                        variant={IconButtonVariant.PRIMARY}
                        className="p-2"
                        title="Download"
                        icon={<DownloadIcon className="w-5 h-5" />}
                      />
                    </td>
                    <td className="sm:p-2">
                      <IconButton
                        variant={IconButtonVariant.PRIMARY}
                        className="p-2"
                        title="Copy link to clipboard"
                        onClick={handleCopyLink(doc.id)}
                        icon={<LinkIcon className="w-5 h-5" />}
                      ></IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default SurveyListPage;
