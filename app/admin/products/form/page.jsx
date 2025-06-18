"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { addProduct, updateProduct  } from "@/lib/admin/productService";
import Swal from "sweetalert2";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function ProductFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = !!searchParams.get("id");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("M");
  const [type, setType] = useState("เสื้อยืด");
  const [featureImageUrl, setFeatureImageUrl] = useState("");
  const [imageUrlsText, setImageUrlsText] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = imageUrlsText
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url);

    const payload = {
      name,
      description,
      price: parseFloat(price),
      salePrice: parseFloat(salePrice),
      stock: parseInt(stock),
      color,
      size,
      type,
      featureImageUrl,
      imageUrls,
      isNew: isNew ? 1 : 0,
      updatedAt: new Date(),
    };
      try {
        if (isEdit) {
          const id = searchParams.get("id");
          await updateProduct(id, payload);
          await Swal.fire({
            icon: 'success',
            title: 'แก้ไขสินค้าเรียบร้อย',
            confirmButtonText: 'ตกลง',
          });
        } else {
          payload.createdAt = new Date();
          await addProduct(payload);
          await Swal.fire({
            icon: 'success',
            title: 'เพิ่มสินค้าเรียบร้อย',
            confirmButtonText: 'ตกลง',
          });
        }

        router.push("/admin/products");

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: ' ไม่สามารถบันทึกสินค้าได้',
          confirmButtonText: 'ปิด',
        });
      }
    };

    useEffect(() => {
      const loadProduct = async () => {
        if (!isEdit) return;

          setIsLoading(true); 
        const id = searchParams.get("id");
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name || "");
          setDescription(data.description || "");
          setPrice(data.price || "");
          setSalePrice(data.salePrice || "");
          setStock(data.stock || "");
          setColor(data.color || "");
          setSize(data.size || "M");
          setType(data.type || "เสื้อยืด");
          setFeatureImageUrl(data.featureImageUrl || "");
          setImageUrlsText((data.imageUrls || []).join("\n"));
          setIsNew(!!data.isNew);
        }
          setIsLoading(false); 
      };
      

      loadProduct();
    }, [isEdit, searchParams]);

if (isEdit && isLoading) {
  return <SpinnerLoader />;
}
  return (

<form onSubmit={handleSubmit} className="relative max-w-6xl fontTH mx-auto fontTH p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
  {/* Decorative Background Elements */}
  
  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
  
  {/* Header */}
  <div className="relative z-10 text-center mb-10">
  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
    {isEdit ? (
      // 🛠 ไอคอนแก้ไข (ดินสอ/เครื่องมือ)
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ) : (
      // ➕ ไอคอนเพิ่ม
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    )}
  </div>

    <h2 className="text-3xl fontTH font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
      {isEdit ? "EditProduct" : "AddProduct"}
    </h2> 
    <p className="text-gray-500  text-lg">กรอกข้อมูลสินค้า</p>
  </div>

  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Row 1 */}
    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
        ชื่อสินค้า *
      </label>
      <div className="relative">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md"
          placeholder="กรอกชื่อสินค้า"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-purple-400/5 group-hover:via-pink-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
        สี
      </label>
      <div className="relative">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md"
          placeholder="เช่น แดง, น้ำเงิน"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/0 via-emerald-400/0 to-green-400/0 group-hover:from-green-400/5 group-hover:via-emerald-400/5 group-hover:to-green-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        ประเภท
      </label>
      <div className="relative">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md appearance-none cursor-pointer"
        >
          <option value="เสื้อยืด">เสื้อยืด</option>
          <option value="กางเกง">กางเกง</option>
          <option value="แจ็คเก็ต">แจ็คเก็ต</option>
          <option value="รองเท้า">รองเท้า</option>
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-cyan-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    {/* Row 2 */}
    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
        ขนาด
      </label>
      <div className="relative">
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md appearance-none cursor-pointer"
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 via-orange-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:via-orange-400/5 group-hover:to-yellow-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
        จำนวนสินค้า (Stock)
      </label>
      <div className="relative">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md"
          placeholder="0"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/0 via-purple-400/0 to-indigo-400/0 group-hover:from-indigo-400/5 group-hover:via-purple-400/5 group-hover:to-indigo-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
        สินค้าใหม่
      </label>
      <div className="flex items-center h-14 px-4 py-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm group-hover:border-gray-300 group-hover:shadow-md transition-all duration-300">
        <div className="relative">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            id="isNew"
            className="sr-only"
          />
          <label htmlFor="isNew" className="flex items-center cursor-pointer">
            <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${isNew ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-300'}`}>
              {isNew && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="ml-3  ">สินค้าใหม่</span>
          </label>
        </div>
      </div>
    </div>

    {/* Row 3 */}
    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
        ราคา
      </label>
      <div className="relative">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md pl-8"
          placeholder="0.00"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₿</div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/0 via-rose-400/0 to-pink-400/0 group-hover:from-pink-400/5 group-hover:via-rose-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
        ราคาลด (Sale Price)
      </label>
      <div className="relative">
        <input
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md pl-8"
          placeholder="0.00"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₿</div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/0 via-red-400/0 to-orange-400/0 group-hover:from-orange-400/5 group-hover:via-red-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    <div className="md:col-span-3 group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
        รายละเอียด
      </label>
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full inputkub border-2 border-gray-200 px-4 py-4 rounded-xl shadow-sm focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-gray-300 group-hover:shadow-md resize-none"
          placeholder="อธิบายรายละเอียดของสินค้า..."
        ></textarea>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-teal-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-teal-400/5 group-hover:to-cyan-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    {/* รูปหลัก */}
    <div className="md:col-span-3 group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
        ลิงก์รูปหลักสินค้า *
      </label>
      <div className="relative">
        <input
          type="text"
          required
          value={featureImageUrl}
          onChange={(e) => setFeatureImageUrl(e.target.value)}
          className="w-full inputkub border-2 border-purple-200 px-4 py-4 rounded-xl shadow-sm focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-purple-300 group-hover:shadow-md"
          placeholder="https://example.com/image.jpg"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-violet-400/0 to-purple-400/0 group-hover:from-purple-400/5 group-hover:via-violet-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
      {featureImageUrl ? (
        <div className="mt-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
          <span className=" text-sm text-gray-500 mb-3 font-normal font-medium">รูปภาพ:</span>
          <div className="relative group/img">
            <img
              src={featureImageUrl}
              alt="Preview"
              className="mx-auto max-h-64 object-contain border-2 border-gray-200 rounded-xl shadow-lg group-hover/img:shadow-2xl transition-all duration-300"
              onError={(e) => (e.currentTarget.src = "/no-image.png")}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/0 via-transparent to-black/0 group-hover/img:from-black/5 group-hover/img:to-black/5 transition-all duration-300"></div>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50/50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-400 italic">ไม่มีรูปแสดงตัวอย่าง</p>
        </div>
      )}
    </div>

    {/* รูปเพิ่มเติม */}
    <div className="md:col-span-3 group">
      <label className=" mb-3 font-normal  text-gray-700 text-sm uppercase tracking-wide flex items-center">
        <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
        ลิงก์รูปเพิ่มเติม (แยกบรรทัด)
      </label>
      <div className="relative">
        <textarea
          value={imageUrlsText}
          onChange={(e) => setImageUrlsText(e.target.value)}
          rows={4}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
          className="w-full inputkub border-2 border-teal-200 px-4 py-4 rounded-xl shadow-sm focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-teal-300 group-hover:shadow-md resize-none"
        ></textarea>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 via-cyan-400/0 to-teal-400/0 group-hover:from-teal-400/5 group-hover:via-cyan-400/5 group-hover:to-teal-400/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>

    {/* Preview รูปเพิ่มเติม */}
    {imageUrlsText.split("\n").filter((url) => url.trim()).length > 0 && (
      <div className="md:col-span-3">
        <h3 className="text-lg  text-gray-700 mb-4 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></span>
          ตัวอย่างรูปเพิ่มเติม
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageUrlsText
            .split("\n")
            .filter((url) => url.trim())
            .map((url, idx) => (
              <div key={idx} className="group/card relative overflow-hidden bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={url.trim()}
                    alt={`image-${idx}`}
                    className="w-full inputkub h-40 object-cover transition-transform duration-300 group-hover/card:scale-105"
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-xs mt-3 text-gray-500 break-words font-mono bg-gray-50 px-2 py-1 rounded-lg">
                  {url.trim().length > 40 ? `${url.trim().substring(0, 40)}...` : url.trim()}
                </p>
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                  {idx + 1}
                </div>
              </div>
            ))}
        </div>
      </div>
    )}

    {/* Submit */}
    <div className="md:col-span-3 mt-8">
      <button
        type="submit"
        className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden group/btn"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10 flex items-center justify-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isEdit ? "บันทึกการแก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        </span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-xl opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
      </button>
    </div>
  </div>
</form>

  );
}
