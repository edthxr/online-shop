import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const snap = await getDocs(collection(db, "products"));
  return NextResponse.json({ count: snap.size });
}