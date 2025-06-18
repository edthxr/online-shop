import { db } from "@/firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

/**
 * เพิ่มสินค้าใหม่ลงใน Firestore
 */
export async function addProduct(data) {
  const {
    name,
    description,
    price,
    salePrice,
    stock,
    color,
    size,
    type,
    featureImageUrl = "",
    imageUrls = [],
    isNew = false
  } = data;

  const docRef = await addDoc(collection(db, "products"), {
    name,
    description,
    price: parseFloat(price),
    salePrice: parseFloat(salePrice),
    stock: parseInt(stock),
    color,
    size,
    type,
    featureImageUrl,
    imageUrls, // ควรเป็น array ของ string url
    isNew: !!isNew, // true หรือ false
    isActive: true,
    tags: [],
    createdAt: new Date(),
  });

  return { id: docRef.id };
}

export async function updateProduct(id, data) {
  const ref = doc(db, "products", id);
  await setDoc(ref, data, { merge: true }); // merge เพื่อไม่ลบ field อื่น
  return { id };
}