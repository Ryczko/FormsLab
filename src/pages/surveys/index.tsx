import { Timestamp } from 'firebase/firestore';

import Image from 'next/image';
import Head from 'next/head';
import { formatDateDistance } from 'shared/utilities/convertTime';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Header from 'shared/components/Header/Header';
import Loader from 'shared/components/Loader/Loader';
import SurveyRow from 'features/surveys/components/SurveyRow/SurveyRow';
import { useSurveyListManager } from 'features/surveys/managers/surveyListManager';
import NoSurveys from '../../../public/images/no-surveys.svg';
import Link from 'next/link';
import { ButtonVariant } from 'shared/components/Button/Button';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';

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

        <div className="flex flex-col items-center justify-center">
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
                    createDate={formatDateDistance(
                      survey.createDate as Timestamp
                    )}
                  ></SurveyRow>
                );
              })
            ) : (
              <>
                <Image
                  className="mt-2 w-[200px] -translate-x-3"
                  src={NoSurveys}
                  alt="no surveys"
                  width="200"
                  height="125"
                />
                <p className="my-8">No surveys yet </p>
                <Link href={'/survey/create'} passHref>
                  <ButtonLink
                    variant={ButtonVariant.OUTLINE_PRIMARY}
                    className="w-full sm:w-auto"
                  >
                    Create Survey
                  </ButtonLink>
                </Link>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));
