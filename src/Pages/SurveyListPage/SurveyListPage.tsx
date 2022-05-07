import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase';
import {
  collection,
  query,
  Timestamp,
  where,
  orderBy,
} from 'firebase/firestore';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import Header from '../../Components/Header';
import SurveyRow from '../../Components/SurveyRow';
import Loader from '../../Components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { formatFirebaseDateWithoutHours } from '../../Utils/convertTime';

function SurveyListPage() {
  useDocumentTitle('Surveys');

  const [user] = useAuthState(auth);
  const surveysCollectionRef = collection(db, 'surveys');
  const q = query(
    surveysCollectionRef,
    where('creatorId', '==', user?.uid),
    orderBy('startDate', 'desc')
  );
  const [surveysCollection, loading, error] = useCollection(q);

  return (
    <div className="container m-auto text-center md:px-8">
      <Header>Surveys</Header>

      <div className="flex flex-col items-center justify-center py-2">
        <p>
          {
            // TODO: add user friendly error message
            error && <strong>Error: {JSON.stringify(error)}</strong>
          }
          {
            // TODO: add fancy loading
            loading && <Loader isLoading={true} />
          }
        </p>
        {surveysCollection &&
          surveysCollection.docs?.length > 0 &&
          surveysCollection.docs.map((doc) => {
            const survey = doc.data();
            return (
              <SurveyRow
                key={doc.id}
                id={doc.id}
                question={survey.title}
                startDate={formatFirebaseDateWithoutHours(
                  survey.startDate as Timestamp
                )}
                endDate={formatFirebaseDateWithoutHours(
                  survey.endDate as Timestamp
                )}
              ></SurveyRow>
            );
          })}
      </div>
    </div>
  );
}
export default SurveyListPage;
