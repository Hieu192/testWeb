import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

const Search = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h2 className="text-xl p-4">Tra cứu thông tin</h2>
      <SearchBar onSearch={setResults} />
      <Table results={results} />
    </div>
  );
};

export default Search;
