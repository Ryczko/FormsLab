import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase';
import NoSurveysImage from '../../Assets/no-surveys.svg';
import {
  collection,
  query,
  Timestamp,
  where,
  orderBy,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import Header from '../../Components/Header';
import SurveyRow from '../../Components/SurveyRow';
import Loader from '../../Components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { formatFirebaseDateWithoutHours } from '../../Utils/convertTime';
import withAnimation from '../../HOC/withAnimation';
import { useEffect, useState } from 'react';

function SurveyListPage() {
  useDocumentTitle('Surveys');

  const [user] = useAuthState(auth);

  const [q, setQ] = useState<Query<DocumentData>>();

  useEffect(() => {
    const surveysCollectionRef = collection(db, 'surveys');
    setQ(
      query(
        surveysCollectionRef,
        where('creatorId', '==', user?.uid),
        orderBy('startDate', 'desc')
      )
    );
  }, [user]);

  const [surveysCollection, loading, error] = useCollection(q);

  return (
    <div className="container m-auto text-center md:px-8">
      <Header>Surveys</Header>

      <div className="flex flex-col items-center justify-center">
        <div>
          {
            // TODO: add user friendly error message
            error && <strong>Error: {JSON.stringify(error)}</strong>
          }
          {
            // TODO: add fancy loading
            loading && <Loader isLoading={true} />
          }
        </div>
        {surveysCollection &&
          (surveysCollection.docs?.length > 0 ? (
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
            })
          ) : (
            <>
              <img
                className="w-[200px] mt-2 -translate-x-3"
                src={NoSurveysImage}
                alt="no surveys"
              />
              <p className="mt-8">No surveys yet </p>
            </>
          ))}
      </div>
    </div>
  );
}
export default withAnimation(SurveyListPage);
