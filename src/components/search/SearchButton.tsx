interface SearchButtonProps {
  onClick: () => void;
  isSearching: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick,isSearching }) => (
  <button
    onClick={onClick}
    disabled={isSearching}
    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
  >
    {isSearching ? "Searching..." : "Search"}
  </button>
);

export default SearchButton;
