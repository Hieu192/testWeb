import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">404 - Không tìm thấy trang</h1>
      <Link to="/" className="mt-4 text-blue-500">Quay lại trang chủ</Link>
    </div>
  );
};

export default NotFound;
