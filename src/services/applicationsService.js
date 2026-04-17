import {
  collection, addDoc, getDocs, updateDoc, doc, deleteDoc,
  query, where, orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const APPS_COL = 'applications';

export async function submitApplication(data) {
  return addDoc(collection(db, APPS_COL), {
    ...data,
    status: 'Pending',
    createdAt: serverTimestamp(),
  });
}

export async function getUserApplications(userId) {
  try {
    const q = query(
      collection(db, APPS_COL),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export async function getAllApplications() {
  try {
    const q = query(collection(db, APPS_COL), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export function subscribeToApplications(callback) {
  const q = query(collection(db, APPS_COL), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

export async function updateApplicationStatus(appId, status) {
  return updateDoc(doc(db, APPS_COL, appId), { status, updatedAt: serverTimestamp() });
}

export async function deleteApplication(appId) {
  try {
    await deleteDoc(doc(db, APPS_COL, appId));
    return true;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
}

export async function checkExistingRegistration(userId, eventId) {
  const q = query(
    collection(db, APPS_COL),
    where('userId', '==', userId),
    where('eventId', '==', eventId)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

