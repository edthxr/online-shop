"use client";
export default function AdminHeader() {
  return (
    <header className="w-full  bg-white border-b h-16 px-6 flex items-center justify-end">
      <div className="text-sm text-right">
        <div className="font-semibold">another</div>
        <div className="text-gray-500">another@gmail.com</div>
      </div>
      <img
        src="https://i.pravatar.cc/40"
        className="w-10 h-10 rounded-full ml-4"
        alt="avatar"
      />
    </header>
  );
}
