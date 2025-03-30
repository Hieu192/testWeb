import { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [mssv, setMssv] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!mssv.trim()) {
      alert("Vui lòng nhập MSSV!");
      return;
    }
    setLoading(true); 
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/sheet/${mssv}`);
      console.log(res.data.user);
      onSearch(res.data.user);
    } catch (error) {
      alert("Lỗi khi tìm kiếm", error.message);
    } finally {
      alert("Tìm kiếm hoàn tất!");
      setLoading(false); // Tắt trạng thái loading sau khi hoàn thành
    }
  };

  return (
    <div className="p-4">
      <input 
        type="text" 
        placeholder="Nhập MSSV" 
        value={mssv} 
        onChange={(e) => setMssv(e.target.value)} 
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} disabled={loading} className="bg-blue-600 text-white p-2">{loading ? "Đang tìm kiếm..." : "Tìm kiếm"}</button>
    </div>
  );
};

export default SearchBar;
