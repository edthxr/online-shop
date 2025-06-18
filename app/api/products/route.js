import { NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");

    const ref = collection(db, "products");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const total = docs.length;

    const start = (page - 1) * size;
    const end = page * size;

    const paginated = docs.slice(start, end).map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: paginated,
      total,
      page,
      size,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


