import { database, storage } from './firebaseSetup';

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export const COLLECTIONS = {
  USER: 'users',
  POST: 'posts',
  COMMENT: 'comments',
  APPOINTMENT: 'appointments',
};

export async function writeToDB(
  data,
  collectionName,
  subCollectionName = null,
  id = null
) {
  try {
    if (id && !subCollectionName) {
      await setDoc(doc(database, collectionName, id), data);
      return;
    }

    let collectionRef;
    if (!subCollectionName) {
      collectionRef = collection(database, collectionName);
    } else {
      if (!id) {
        throw new Error('Id must be specified when adding subCollection');
      }
      collectionRef = collection(
        doc(database, `${collectionName}/${id}`),
        subCollectionName
      );
    }
    await addDoc(collectionRef, data);
  } catch (err) {
    console.log(err);
  }
}

export async function readFromStorage(path) {
  try {
    return await getDownloadURL(ref(storage, path));
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB(data, collectionName, id) {
  try {
    await updateDoc(doc(database, collectionName, id), data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (err) {
    console.log(err);
  }
}

export async function readFromDB(collectionName, id) {
  try {
    const document = await getDoc(doc(database, collectionName, id));
    if (!document.exists()) {
      throw new Error('The document requested does not exist in database');
    }
    return document.data();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function readAllFromDB(collectionName, subCollectionName, id) {
  try {
    let collectionRef = collection(
      doc(database, collectionName, id),
      subCollectionName
    );
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getBookedTimeslots(trainerId, date) {
  try {
    const trainerRef = doc(database, 'Trainer', trainerId);
    const trainerDoc = await getDoc(trainerRef);
    if (trainerDoc.exists()) {
      const bookedTimeslots = trainerDoc.data().bookedTimeslots || {};
      return bookedTimeslots[date] || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching booked timeslots:', error);
    return [];
  }
}

export async function getAllBookedTimeslots(trainerId) {
  try {
    const trainerRef = doc(database, 'Trainer', trainerId);
    const trainerDoc = await getDoc(trainerRef);
    if (trainerDoc.exists()) {
      return trainerDoc.data().bookedTimeslots || {};
    }
    return {};
  } catch (error) {
    console.error('Error fetching all booked timeslots:', error);
    return {};
  }
}

export async function addBookedTimeslot(trainerId, date, time) {
  try {
    const trainerRef = doc(database, 'Trainer', trainerId);
    await updateDoc(trainerRef, {
      [`bookedTimeslots.${date}`]: arrayUnion(time),
    });
  } catch (error) {
    console.error('Error adding booked timeslot:', error);
  }
}

export async function addAppointment(user, trainerId, trainerName, datetime) {
  try {
    await addDoc(collection(database, 'Appointments'), {
      user,
      trainerId,
      trainerName,
      datetime,
    });
  } catch (error) {
    console.error('Error adding appointment:', error);
  }
}

export async function cancelAppointment(appointmentId, trainerId, date, time) {
  try {
    const trainerRef = doc(database, 'Trainer', trainerId);

    await updateDoc(trainerRef, {
      [`bookedTimeslots.${date}`]: arrayRemove(time),
    });

    const appointmentRef = doc(database, 'Appointments', appointmentId);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
}

// export async function deleteAllFromDB(collectionName) {
//   try {
//     const querySnapshot = await getDocs(collection(database, collectionName));
//     querySnapshot.forEach((docSnapshot) => {
//       deleteFromDB(docSnapshot.id, collectionName);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function readAll(collectionName) {
//   try {
//     const querySnapshot = await getDocs(collection(database, collectionName));
//     let newArray = [];
//     if (!querySnapshot.empty) {
//       querySnapshot.forEach((docSnapshot) => newArray.push(docSnapshot.data()));
//     }
//     return newArray;
//   } catch (err) {
//     console.log(err);
//   }
// }
