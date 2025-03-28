const Table = ({ results }) => {
    return (
        <div className="border p-4 rounded">
            <p><strong>MSSV:</strong> {results.mssv}</p>
            <p><strong>Họ tên:</strong> {results.name}</p>
            <p><strong>SDT:</strong> {results.phone}</p>
        </div>
    );
  };
  
  export default Table;
  