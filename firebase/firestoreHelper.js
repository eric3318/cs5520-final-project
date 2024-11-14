import { database } from './firebaseSetup';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

export async function writeToDB(data, collectionName, id = null) {
  try {
    if (id) {
      await updateDoc(doc(database, collectionName, id), data);
    } else {
      await addDoc(collection(database, collectionName), data);
    }
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
