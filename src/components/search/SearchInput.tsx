interface SearchInputProps {
    query: string;
    setQuery: (value: string) => void;
  }
  
  const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border border-gray-300 p-2 rounded-md w-full md:w-1/3"
    />
  );
  
  export default SearchInput;
  