import { Timestamp } from 'firebase/firestore';

import Image from 'next/image';
import Head from 'next/head';
import { formatFirebaseDateWithoutHours } from '../../shared/utilities/convertTime';
import withAnimation from '../../shared/HOC/withAnimation';
import withProtectedRoute from '../../shared/HOC/withProtectedRoute';
import Header from 'src/shared/components/Header/Header';
import Loader from 'src/shared/components/Loader/Loader';
import SurveyRow from 'src/features/surveys/components/SurveyRow/SurveyRow';
import { useSurveyListManager } from 'src/features/surveys/managers/surveyListManager';

function SurveyListPage() {
  const { error, loading, surveysCollection } = useSurveyListManager();

  return (
    <>
      <Head>
        <title>Surveys</title>
        <meta name="description" content="Surveys - Employee Pulse" />
      </Head>
      <div className="container m-auto text-center md:px-8">
        <Header>Surveys</Header>

        <div className="flex flex-col justify-center items-center">
          <div>
            {error && (
              <strong>
                There is a problem - your surveys cannot be viewed.
              </strong>
            )}
            {loading && <Loader isLoading={true} />}
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
                  src={'/images/no-surveys.svg'}
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
