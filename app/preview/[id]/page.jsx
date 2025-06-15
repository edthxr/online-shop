"use client";
import { useCart } from "@/components/CartContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  { id: 1, name: "NO RICH", price: 399, imageUrl: "/photo/photo1 (1).png", description: "เสื้อยืดผ้าดี สวมใส่สบาย" },
  { id: 2, name: "P9D COLLECTION - White", price: 699, imageUrl: "/photo/photo2.png", description: "ดีไซน์สไตล์สตรีทเท่ ๆ" },
  { id: 3, name: "FREE", price: 69, imageUrl: "/photo/photo3.png", description: "เสื้อฟรีสุดคิวท์ของคอลใหม่" },
  { id: 4, name: "FREE", price: 89, imageUrl: "/photo/1.png", description: "รุ่นยอดนิยมขายดีอันดับต้น ๆ" },
  { id: 7, name: "FREE", price: 95, imageUrl: "/photo/photo1 (1).png", description: "วัสดุดี สีดำคลาสสิก" },
  { id: 8, name: "FREE", price: 95, imageUrl: "/photo/photo1 (1).png", description: "สินค้ารุ่นลิมิเต็ด" },
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

  const goToCart = () => {
    router.push("/Cart");
  };

    const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };


  return (
    <div className="p-6 md:p-12 flex mt-20 flex-col md:flex-row gap-10 items-start max-w-5xl mx-auto">
      {/* Left: Product Image */}
      <div className="w-full md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Right: Product Details */}
      <div className="w-full md:w-1/2 space-y-5">
        <h1 className="text-3xl font-bold text-black">{product.name}</h1>
        <p className="text-xl text-pink-600">฿{product.price.toLocaleString()}</p>

        {/* Buy Button */}
        <button
         onClick={() => handleAddToCart(product)}
          className="mt-4 flex items-center justify-center gap-2 bg-black text-white text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          <FaShoppingCart />
          ซื้อเลย
        </button>
      </div>
    </div>
  );
}
