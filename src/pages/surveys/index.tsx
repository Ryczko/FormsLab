import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase';
import {
  collection,
  query,
  Timestamp,
  where,
  orderBy,
  DocumentData,
  Query,
} from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { formatFirebaseDateWithoutHours } from '../../utilities/convertTime';
import withAnimation from '../../HOC/withAnimation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import withProtectedRoute from '../../HOC/withProtectedRoute';
import Head from 'next/head';
import Header from 'src/components/Header/Header';
import Loader from 'src/components/Loader/Loader';
import SurveyRow from 'src/components/SurveyRow/SurveyRow';

function SurveyListPage() {
  const [user] = useAuthState(auth);

  const [q, setQ] = useState<Query<DocumentData>>();

  useEffect(() => {
    if (user?.uid) {
      const surveysCollectionRef = collection(db, 'surveys');
      setQ(
        query(
          surveysCollectionRef,
          where('creatorId', '==', user?.uid),
          orderBy('startDate', 'desc')
        )
      );
    }
  }, [user]);

  const [surveysCollection, loading, error] = useCollection(q);

  return (
    <>
      <Head>
        <title>Surveys</title>
      </Head>
      <div className="container m-auto text-center md:px-8">
        <Header>Surveys</Header>

        <div className="flex flex-col justify-center items-center">
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
                <Image
                  className="mt-2 w-[200px] -translate-x-3"
                  src={'/no-surveys.svg'}
                  alt="no surveys"
                  width="200"
                  height="125"
                />
                <p className="mt-8">No surveys yet </p>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));
