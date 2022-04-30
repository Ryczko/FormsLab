import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';
import SurveyRow from './SurveyRow/SurveyRow';
import Loader from '../../Components/Loader/Loader';

function SurveyListPage() {
  useDocumentTitle('Surveys');

  const [surveysCollection, loading, error] = useCollection(
    collection(db, 'surveys')
  );

  return (
    <div className="container m-auto md:px-8 text-center">
      <HeaderComponent>Surveys</HeaderComponent>

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
                time={survey.createdDate.toDate().toDateString()}
              ></SurveyRow>
            );
          })}
      </div>
    </div>
  );
}
export default SurveyListPage;
