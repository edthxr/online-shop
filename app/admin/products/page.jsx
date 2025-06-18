"use client";
import { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Button,
  TablePagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "@/lib/admin/productService";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import SpinnerLoader from "@/components/SpinnerLoader";


export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("M");
  const [type, setType] = useState("เสื้อยืด");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts();
}, []);


const [page, setPage] = useState(0); // เริ่มที่ 0 (MUI ใช้ 0-based)
const [rowsPerPage, setRowsPerPage] = useState(10);
const [total, setTotal] = useState(0);


const fetchProducts = async (page = 0, size = rowsPerPage) => {
  setIsLoading(true);
  const res = await fetch(`/api/products?page=${page + 1}&size=${size}`);
  const result = await res.json();
  if (result.success) {
    setProducts(result.data);
    setTotal(result.total);
  } else {
    alert("❌ โหลดข้อมูลไม่สำเร็จ: " + result.error);
  }
  setIsLoading(false);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description, price, color, size, type, imageUrl };
    try {
      const result = await addProduct(data);
      alert("✅ เพิ่มสินค้าแล้ว: " + result.id);
      setName(""); setDescription(""); setPrice(""); setColor("");
      setSize("M"); setType("เสื้อยืด"); setImageUrl("");
      fetchProducts();
    } catch (err) {
      alert("❌ เพิ่มไม่สำเร็จ");
    }
  };

  const deleteProduct = async (id) => {
    if (confirm("ลบสินค้านี้?")) {
      await deleteDoc(doc(db, "products", id));
      setProducts(prev => prev.filter(p => p.id !== id));
      fetchProducts();
    }
  };

  if (isLoading) {
    return <SpinnerLoader />; // 👈 ใช้ Loader ที่คุณสร้างไว้
  }

return (
  <div className="space-y-6 fontTH ">
    <div className="flex justify-between items-center">
      <Typography variant="h5" component="h1" fontWeight="normal" fontFamily={"Mitr"}>
        จัดการสินค้า
      </Typography>
      <Link href="/admin/products/form">
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          เพิ่มสินค้า
        </Button>
      </Link>
    </div>

    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ borderRadius: 2 }}
    >
      <Table size="small">
        <TableHead sx={{ backgroundColor: "white" }}>
         <TableRow sx={{ 
          "& th": { 
          fontWeight: "normal",
          fontFamily: "Mitr",
          paddingTop: "16px",      // 👈 เพิ่ม padding top
          paddingBottom: "16px",   // 👈 เพิ่ม padding bottom
          }
           }}>
            <TableCell>ลำดับ</TableCell>
            <TableCell>ชื่อสินค้า</TableCell>
            <TableCell>ราคา</TableCell>
            <TableCell>คงเหลือ</TableCell>
            <TableCell>รูป</TableCell>
            <TableCell align="center">จัดการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, index) => (
            <TableRow
              key={p.id}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price} บาท</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>
                <img
                  src={p.featureImageUrl}
                  alt={p.name}
                  style={{
                    width: 45,
                    height: 45,
                    objectFit: "cover",
                    borderRadius: 6,
                    border: "1px solid #e2e8f0",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/no-image.png";
                  }}
                />
              </TableCell>
         <TableCell align="center">
          <Link href={`/admin/products/form?id=${p.id}`}>
              <IconButton
            size="small"
            sx={{
              backgroundColor: "#white",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              color: "#ffc107",
              "&:hover": {
                backgroundColor: "#e0e0e0", // เพิ่มสี hover
              },
              width: 32,
              height: 32,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          </Link>

          <IconButton
            color="error"
            onClick={() => deleteProduct(p.id)}
            size="small"
             sx={{
              backgroundColor: "#white",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              color: "#d32f2f",
              marginLeft: 1,
              "&:hover": {
                backgroundColor: "#e0e0e0", // เพิ่มสี hover
              },
              width: 32,
              height: 32,
              
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
  component="div"
  count={total}
  page={page}
  onPageChange={(e, newPage) => {
    setPage(newPage);
    fetchProducts(newPage, rowsPerPage);
  }}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(e) => {
    const newSize = parseInt(e.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    fetchProducts(0, newSize);
  }}
  rowsPerPageOptions={[5, 10, 20, 50]}
/>
  </div>
);

}