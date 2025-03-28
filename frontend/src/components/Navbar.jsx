import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white p-4 flex justify-between shadow-lg">
      <h1 className="text-xl font-bold">Quản lý thông tin</h1>
      <div>
        <Link to="/" className="mr-4">Nhập thông tin</Link>
        <Link to="/search">Tra cứu</Link>
      </div>
    </nav>
  );
};

export default Navbar;
