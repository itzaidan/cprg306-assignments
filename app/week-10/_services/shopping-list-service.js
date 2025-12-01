import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

async function getItems(userId) {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'items'));

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function addItem(userId, itemToAdd) {
    const docRef = await addDoc(collection(db, 'users', userId, 'items'), itemToAdd);
    return docRef.id;
}

async function deleteItem(userId, itemId) {
    try {
        await deleteDoc(doc(db, 'users', userId, 'items', itemId));
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
}

export { getItems, addItem, deleteItem };