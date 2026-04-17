import {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, query, where, orderBy, serverTimestamp,
  onSnapshot, deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { dummyEvents } from '../data/dummyEvents';

const EVENTS_COL = 'events';

// Try Firestore first, fall back to dummy data
export async function getEvents() {
  try {
    const q = query(collection(db, EVENTS_COL), orderBy('date', 'asc'));
    const snap = await getDocs(q);
    if (snap.empty) return dummyEvents;
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return dummyEvents;
  }
}

export async function getEventById(id) {
  try {
    const snap = await getDoc(doc(db, EVENTS_COL, id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch {}
  return dummyEvents.find(e => e.id === id) || null;
}

export async function createEvent(data) {
  return addDoc(collection(db, EVENTS_COL), { ...data, createdAt: serverTimestamp() });
}

export async function updateEvent(id, data) {
  return updateDoc(doc(db, EVENTS_COL, id), data);
}

export async function deleteEvent(id) {
  return deleteDoc(doc(db, EVENTS_COL, id));
}

export function subscribeToEvents(callback) {
  const q = query(collection(db, EVENTS_COL), orderBy('date', 'asc'));
  return onSnapshot(q, snap => {
    if (snap.empty) {
      callback(dummyEvents);
    } else {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
  });
}
