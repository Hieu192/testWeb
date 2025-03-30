const Table = ({ results }) => {
    function formatDriveImageUrl(url) {
        const match = url.match(/id=([^&]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/thumbnail?id=${match[1]}`;
        }
        return url; // Trả về URL gốc nếu không tìm thấy ID
    }
    return (
        <div className="border p-4 rounded">
            <p><strong>MSSV:</strong> {results.mssv}</p>
            <p><strong>Họ tên:</strong> {results.name}</p>
            <p><strong>SDT:</strong> {results.phone}</p>
            <p><strong>Hình ảnh:</strong></p>
            <div className="flex flex-wrap gap-4 mt-4">
                {results.image?.map((url, index) => (
                    <img key={index} src={formatDriveImageUrl(url)} alt={`Image ${index + 1}`} className="w-32 h-32 object-cover" />
                ))}
            </div>
        </div>
    );
  };
  
  export default Table;
  