import { DocumentData, Query } from 'firebase/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useApplicationContext } from 'src/features/application/context';
import { db } from 'src/firebase';

export const useSurveyListManager = () => {
  const { user } = useApplicationContext();
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

  return { error, loading, surveysCollection };
};
