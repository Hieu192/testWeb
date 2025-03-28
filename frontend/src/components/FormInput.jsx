import { useEffect, useState } from "react";
import axios from "axios";

const FormInput = () => {
  const [data, setData] = useState({ mssv: "", name: "", phone: ""});
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  console.log("data", data);
  console.log("images", images);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      // Tạo URL preview cho mỗi file
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tạo đối tượng FormData để gửi dữ liệu dạng multipart/form-data
      const formData = new FormData();
      // Append các trường text
      for (const key in data) {
        console.log("key", key);
        console.log("data[key]", data[key]);
        formData.append(key, data[key]);
        console.log("formData", formData);
      }
      // Append từng file hình ảnh vào FormData, dùng key 'images'
      images.forEach((file) => {
        formData.append("images", file);
      });
      for (let pair of formData.entries()) {
        console.log("test vip::",pair[0] + ': ' + pair[1]);
      }
      // Gọi API với axios
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/sheet`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Dữ liệu đã được lưu!");
    } catch (error) {
      alert("Lỗi khi lưu dữ liệu: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input 
        type="text" 
        name="mssv" 
        placeholder="Mã số sinh viên " 
        value={data.mssv} 
        onChange={handleChange} 
        className="border p-2 w-full mb-2"
      />
      <input 
        type="text" 
        name="name" 
        placeholder="Tên" 
        value={data.name} 
        onChange={handleChange} 
        className="border p-2 w-full mb-2"
      />
      <input 
        type="text" 
        name="phone" 
        placeholder="Số điện thoại" 
        value={data.phone} 
        onChange={handleChange} 
        className="border p-2 w-full mb-2"
      />
      <input 
        type="file" 
        name="images" 
        multiple 
        onChange={handleFileChange} 
        className="border p-2 w-full mb-2"
      />
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {previewUrls.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Preview ${index}`} 
              className="w-24 h-24 object-cover border"
            />
          ))}
        </div>
      )}
      <button type="submit" className="bg-blue-600 text-white p-2">Gửi</button>
    </form>
  );
};

export default FormInput;


