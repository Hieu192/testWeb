import { useState } from 'react'
import './App.css'

function App() {
  const [mssv, setMssv] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const fetchStudentInfo = async () => {
    try {
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/sheet/${mssv}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Không tìm thấy sinh viên");
      const data = await response.json();
      setStudent(data.user);
    } catch (err) {
      setError(err.message);
      setStudent(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Tra cứu thông tin sinh viên</h2>
      <input
        type="text"
        placeholder="Nhập MSSV"
        value={mssv}
        onChange={(e) => setMssv(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={fetchStudentInfo}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Tra cứu
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {student && (
        <div className="border p-4 rounded">
          <p><strong>MSSV:</strong> {student.mssv}</p>
          <p><strong>Họ tên:</strong> {student.name}</p>
          <p><strong>SDT:</strong> {student.phone}</p>
        </div>
      )}
    </div>
  );
}

export default App
