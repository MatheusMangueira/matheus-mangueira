import { collection, query, where, getDocs, addDoc, orderBy, WithFieldValue, DocumentData } from "firebase/firestore";
import { db } from './firebase';
import { Message } from "@/components/messages/type";

export const fetchMessages = async () => {
  const messagesQuery = query(collection(db, "messages"), orderBy("date", "asc"));

  const querySnapshot = await getDocs(messagesQuery);

  return querySnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    return {
      name: data.name,
      message: data.message,
      relationship: data.relationship,
      date: data.date || '',
      userId: data.userId
    } as Message;
  });
};

export const userHasPosted = async (userId: string) => {
  const userMessagesQuery = query(collection(db, "messages"), where("userId", "==", userId));
  const userMessagesSnapshot = await getDocs(userMessagesQuery);
  return !userMessagesSnapshot.empty;
};

export const postMessage = async (messageData: WithFieldValue<DocumentData>) => {
  await addDoc(collection(db, "messages"), messageData);
};