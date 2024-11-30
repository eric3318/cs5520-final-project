import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import uuid from 'react-native-uuid';
import { trainers } from './constants';

export async function initializeTrainers() {
  const setupDocRef = doc(database, 'AppSetup', 'setupComplete');
  const setupDocSnap = await getDoc(setupDocRef);

  if (setupDocSnap.exists()) {
    return;
  }

  const trainerCollection = collection(database, 'Trainer');

  for (const trainer of trainers) {
    const trainerId = uuid.v4();
    await setDoc(doc(trainerCollection, trainerId), {
      ...trainer,
      trainerId,
      bookedTimeslots: {},
    });
  }

  await setDoc(setupDocRef, { initialized: true });
}
