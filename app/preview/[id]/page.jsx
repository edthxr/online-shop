"use client";
import { useCart } from "@/components/CartContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const products = [
  { id: 1, name: "NO RICH", price: 399, imageUrl: "/photo/photo1 (1).png", description: "" },
  { id: 2, name: "P9D COLLECTION", price: 699, imageUrl: "/photo/photo2.png", description: "" },
  { id: 7, name: "NO RISK NO RICH - BLACK", price: 1390, imageUrl: "/photo/no2.png", description: "" },
  { id: 3, name: "NO RISK HOODIE SS20", price: 6900, imageUrl: "/photo/ss2.png", description: "" },
  { id: 4, name: "NEVER LIE", price: 89, imageUrl: "/photo/1.png", description: "" },
  { id: 8, name: "HOODIE -REDBLACK SERIES", price: 9500, imageUrl: "/photo/hoo.png", description: "" },
];

export default function PreviewPage() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  const goBack = () => router.back();

  const goToCart = () => {
    router.push("/Cart");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-6 md:p-12 flex  mt-20 flex-col md:flex-row gap-10 items-start max-w-5xl mx-auto">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2  text-white group cursor-move relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full  object-contain rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:contrast-125 outline-none focus:outline-none"
        />
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2 space-y-5">
        <h1 className="text-3xl font-bold text-black">{product.name}</h1>
        <p className="text-lg text-gray-500 font-sm">฿ {product.price.toLocaleString()} THB</p>

        <div className="flex gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 border border-gray-400 text-black px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaArrowLeft />
            ย้อนกลับ
          </button>

          <button
            onClick={() => handleAddToCart(product)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            <FaShoppingCart />
            ซื้อเลย
          </button>
        </div>

        {notification && (
          <div className="text-green-600 text-sm">{notification}</div>
        )}
      </div>
    </div>
  );
}
